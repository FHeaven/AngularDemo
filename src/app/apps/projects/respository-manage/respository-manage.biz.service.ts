import { Injectable } from '@angular/core';
import { ApiResponseInfo, StoreInInfo, DownloadStoreInByApplyIdRequestInfo } from 'app/domain';
import * as _ from 'lodash';
import { RespositoryManageComponent } from './respository-manage.component';
import {
    ProgCodeDataService, FoundationService,
    OpStoreInApiService,
    DownloadStoreInByApplyIdApiService
} from 'app/services';
declare var $: any;


@Injectable()
export class RespositoryManageBizService {

    private compInstance: RespositoryManageComponent = null;

    constructor(
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        private opStoreInApiService: OpStoreInApiService,
        private downloadByApplyIdService: DownloadStoreInByApplyIdApiService
    ) { }

    setComponent(compInstance: RespositoryManageComponent) {
        this.compInstance = compInstance;
    }

    /**
     * Save Store in data.
     */
    saveNewStoreIn(lstStoreIn: StoreInInfo[], onSuccessFn: Function, onFailed: Function) {
        const tempStoreIn = _.cloneDeep(lstStoreIn) as StoreInInfo[];
        _.each(tempStoreIn, (item: StoreInInfo) => {
            item.typeaheadCompConfig = undefined;
        });
        this.opStoreInApiService.call({
            requestJson: tempStoreIn,
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                onSuccessFn(tempStoreIn);
            },
            onFailed: () => {
                onFailed();
            }
        });
    }

    /**
     * Delete Store in data.
     */
    deleteOneStoreIn(storeInItem: StoreInInfo, callbackFn?: Function) {
        const tempStoreIn = _.cloneDeep(storeInItem) as StoreInInfo;
        tempStoreIn.action = 'D';
        this.opStoreInApiService.call({
            requestJson: [tempStoreIn],
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                if (callbackFn) {
                    callbackFn();
                }
            }
        });
    }

    /**
     * Downlaod Report.
     */
    downloadStoreInInfo(storeInId: string) {
        if (_.isEmpty(storeInId)) {
            this.foundationSvc.onError('请输入入库单号.');
            return;
        }
        const layerIndex = this.foundationSvc.showProcessLayer();
        const requestJson = new DownloadStoreInByApplyIdRequestInfo();
        requestJson.in_id = storeInId;
        this.downloadByApplyIdService.call({
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
