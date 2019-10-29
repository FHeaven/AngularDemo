import { Injectable } from '@angular/core';
import { ApiResponseInfo } from 'app/domain';
import { DownloadMonthlyReportRequestInfo } from './download-monthly-report.info';
import * as _ from 'lodash';
declare const $: any;
import { DownloadMonthlyReportComponent } from './download-monthly-report.component';
import {
    ProgCodeDataService,
    FoundationService,
    GetApplierListApiService,
    DownloadStoreOutByApplyIdApiService,
    DownloadStoreOutInMonthlyApiService,
    DownloadStoreInMonthlyApiService,
    DownloadStoreOutMonthlyApiService
} from 'app/services';

@Injectable()
export class DownloadMonthlyReportBizService {

    private compInstance: DownloadMonthlyReportComponent = null;

    constructor(
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        private downloadStoreOutInApiSvc: DownloadStoreOutInMonthlyApiService,
        private downloadStoreInApiSvc: DownloadStoreInMonthlyApiService,
        private downloadStoreOutApiSvc: DownloadStoreOutMonthlyApiService
    ) { }

    setComponent(compInstance: DownloadMonthlyReportComponent) {
        this.compInstance = compInstance;
    }

    getQueryTypeaheadConfig(dataSource, placeHolder, callbackFn) {
        return {
            inputPlaceHolder: placeHolder,
            callbackFn: {
                onChanged: (selectedValue) => {
                    callbackFn(selectedValue);
                }
            },
            initData: {
                selectedValue: '',
                dataSource: dataSource
            },
            componnetApi: {}
        };
    }

    private onDownload(apiSvc: any) {

        const { UICtrlInfo } = this.compInstance;
        if (!_.isEmpty(UICtrlInfo.selectedReportMonth)) {
            const layerIndex = this.foundationSvc.showProcessLayer();
            const requestJson = new DownloadMonthlyReportRequestInfo();
            requestJson.reportMonth = UICtrlInfo.selectedReportMonth;
            apiSvc.call({
                requestJson,
                onSuccessFn: (response: ApiResponseInfo<string>) => {
                    UICtrlInfo.downloadUrl = this.foundationSvc.getDownloadUrl(response.responseObject);
                    setTimeout(() => {
                        $('#downloadReport').click();
                    }, 0);
                },
                onResponse: () => {
                    this.foundationSvc.closeProcessLayer(layerIndex);
                }
            });
        } else {
            this.foundationSvc.onWarning('请输入月份.');
        }


    }

    onDownloadMonthlyStoreOut() {
        this.onDownload(this.downloadStoreOutApiSvc);
    }

    onDownloadMonthlyStoreInOut() {
        this.onDownload(this.downloadStoreOutInApiSvc);
    }

    onDownloadMonthlyStoreIn() {
        this.onDownload(this.downloadStoreInApiSvc);
    }
}
