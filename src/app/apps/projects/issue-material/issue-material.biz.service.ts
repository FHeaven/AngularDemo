import { Injectable } from '@angular/core';
import { ApiResponseInfo, ApplyHeadInfo, ApplyDetailInfo, DownloadStoreOutByApplyIdRequestInfo } from 'app/domain';
import * as _ from 'lodash';
declare const $: any;
import { IssueMaterialComponent } from './issue-material.component';
import {
    ProgCodeDataService,
    FoundationService,
    GetApplyHdListApiService,
    GetApplyMaterialIdsApiService,
    GetApplierListApiService,
    GetApplyLnListApiService,
    SaveIssueMaterialApiService,
    DownloadStoreOutByApplyIdApiService
} from 'app/services';
import * as moment from 'moment';

@Injectable()
export class IssueMaterialBizService {

    private compInstance: IssueMaterialComponent = null;

    constructor(
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        private getApplierIdService: GetApplyMaterialIdsApiService,
        private getApplerLstSvc: GetApplierListApiService,
        private getApplyHdListApiSvc: GetApplyHdListApiService,
        private getApplyLnListApiSvc: GetApplyLnListApiService,
        private saveIssueApiService: SaveIssueMaterialApiService,
        private downloadApiSvc: DownloadStoreOutByApplyIdApiService,
    ) { }

    setComponent(compInstance: IssueMaterialComponent) {
        this.compInstance = compInstance;
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

    onSearchApplyHd({ is_completed, applier, apply_id, onSuccessFn, onFailed }) {
        this.getApplyHdListApiSvc.call({
            requestJson: { is_completed, applier, apply_id },
            onSuccessFn: (response: ApiResponseInfo<ApplyHeadInfo[]>) => {
                onSuccessFn(response.responseObject);
            },
            onFailed: () => {
                onFailed();
            }
        });
    }

    onSearchApplyDetail({ apply_id, callbackFn }) {
        this.getApplyLnListApiSvc.call({
            requestJson: { apply_id },
            onSuccessFn: (response: ApiResponseInfo<ApplyHeadInfo[]>) => {
                callbackFn(response.responseObject);
            }
        });
    }

    onSaveIssueMaterial(lstIssueMaterial: ApplyDetailInfo[], onSuccessFn: Function, onFailed: Function) {
        let lstTmpIssueMaterial = _.cloneDeep(lstIssueMaterial) as ApplyDetailInfo[];
        lstTmpIssueMaterial = _.filter(lstTmpIssueMaterial, (item: ApplyDetailInfo) => {
            return item.status !== 'Y';
        });
        _.each(lstTmpIssueMaterial, (item: ApplyDetailInfo) => {
            item.status = item.isChecked ? 'Y' : 'N';
            item.isChecked = undefined;
            const spillQty = item.issued_qty * 1 + item.issuing_qty * 1 - item.apply_qty * 1;
            if (spillQty > 0) {
                item.spill_qty = spillQty;
            } else {
                item.spill_qty = 0;
            }
            item.issue_date = moment().format('YYYY-MM-DD HH:mm:ss');
            item.issue_operator = this.progCodeDataService.getCurrentUserInfo().user_name;
        });
        this.saveIssueApiService.call({
            requestJson: lstTmpIssueMaterial,
            onSuccessFn: (response: ApiResponseInfo<string[]>) => {
                onSuccessFn(response.responseObject);
            },
            onFailed: () => {
                onFailed();
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
