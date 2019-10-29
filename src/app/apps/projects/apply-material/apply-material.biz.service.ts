import { Injectable } from '@angular/core';
import { ApiResponseInfo, ApplyMaterialInfo, DownloadStoreOutByApplyIdRequestInfo } from 'app/domain';
import * as _ from 'lodash';
declare const $: any;
import { ApplyMaterialComponent } from './apply-material.component';
import {
    ProgCodeDataService,
    FoundationService,
    OpApplyMaterialApiService,
    GetApplyMaterialIdsApiService,
    GetApplyMaterialsByIdService,
    GetApplierListApiService,
    DownloadStoreOutByApplyIdApiService
} from 'app/services';

@Injectable()
export class ApplyMaterialBizService {

    private compInstance: ApplyMaterialComponent = null;

    constructor(
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        private getApplierIdService: GetApplyMaterialIdsApiService,
        private getByIdService: GetApplyMaterialsByIdService,
        private getApplerLstSvc: GetApplierListApiService,
        private opService: OpApplyMaterialApiService,
        private downloadApiSvc: DownloadStoreOutByApplyIdApiService,
    ) { }

    setComponent(compInstance: ApplyMaterialComponent) {
        this.compInstance = compInstance;
    }

    applyMaterials(lstItem: ApplyMaterialInfo[], onSuccessFn?: Function, onFailed?: Function) {
        const lstTempItem = _.cloneDeep(lstItem) as ApplyMaterialInfo[];
        _.each(lstTempItem, (item: ApplyMaterialInfo) => {
            item.typeaheadCompConfig = undefined;
        });
        this.opService.call({
            requestJson: lstTempItem,
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                onSuccessFn(lstTempItem);
            },
            onFailed: () => {
                if (onFailed) {
                    onFailed();
                }
            }
        });
    }

    deleteOneItem(item: ApplyMaterialInfo, onSuccessFn?: Function, onFailed?: Function) {
        const tempItem = _.cloneDeep(item) as ApplyMaterialInfo;
        tempItem.action = 'D';
        this.opService.call({
            requestJson: [tempItem],
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                if (onSuccessFn) {
                    onSuccessFn();
                }
            },
            onFailed: () => {
                if (onFailed) {
                    onFailed();
                }
            }
        });
    }

    getApplierIds({ applier, isCompleted, callbackFn }) {
        this.getApplierIdService.call({
            requestJson: {
                applier, isCompleted
            },
            onSuccessFn: (response: ApiResponseInfo<string[]>) => {
                callbackFn(response.responseObject);
            }
        });
    }

    getAppierLst({ isCompleted, callbackFn }) {
        this.getApplerLstSvc.call({
            requestJson: {
                isCompleted
            },
            onSuccessFn: (response: ApiResponseInfo<string[]>) => {
                callbackFn(response.responseObject);
            }
        });
    }

    getApplyMaterialsById({ apply_id, onSuccessFn, onFailedFn }) {
        this.getByIdService.call({
            requestJson: { apply_id },
            onSuccessFn: (response: ApiResponseInfo<ApplyMaterialInfo[]>) => {
                onSuccessFn(response.responseObject);
            },
            onFailed: () => {
                onFailedFn();
            }
        });
    }

    onDownloadStoreOut(applyId: string) {
        const layerIndex = this.foundationSvc.showProcessLayer();
        const requestJson = new DownloadStoreOutByApplyIdRequestInfo();
        requestJson.apply_id = applyId;
        this.downloadApiSvc.call({
            requestJson,
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                this.compInstance.downloadUrl = this.foundationSvc.getDownloadUrl(response.responseObject);
                setTimeout(() => {
                    $('#downloadReport').click();
                }, 0);
            },
            onResponse: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

}
