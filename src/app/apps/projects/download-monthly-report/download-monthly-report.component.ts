import { Component, OnInit } from '@angular/core';
import { DownloadMonthlyReportBizService } from './download-monthly-report.biz.service';
import { AppBaseComponent } from 'app/apps/app-base-component';
import { ActivatedRoute } from '@angular/router';
import { FoundationService } from 'app/services';
import { DownloaddMonthlyReportUICtrlInfo } from './download-monthly-report.info';
import * as moment from 'moment';

@Component({
    selector: 'app-download-monthly-report',
    templateUrl: './download-monthly-report.component.html',
    styleUrls: ['./download-monthly-report.component.scss']
})
export class DownloadMonthlyReportComponent extends AppBaseComponent implements OnInit {

    UICtrlInfo = new DownloaddMonthlyReportUICtrlInfo();

    constructor(
        private bizSvc: DownloadMonthlyReportBizService,
        private foundationSvc: FoundationService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.bizSvc.setComponent(this);

        const lstMonth = [];
        let current = moment();
        for (let index = 0; index < 3; index++) {
            lstMonth.push(current.format('YYYY-MM'));
            current = current.add('month', -1);
        }
        this.UICtrlInfo.typeaheadConfig = this.getQueryTypeaheadConfig([...lstMonth],
            '请输入月份，格式如 2019-01',
            (selectedItem: string) => {
                this.UICtrlInfo.selectedReportMonth = selectedItem;
            });
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

    onDownloadMonthlyStoreOut() {
        this.bizSvc.onDownloadMonthlyStoreOut();
    }

    onDownloadMonthlyStoreInOut() {
        this.bizSvc.onDownloadMonthlyStoreInOut();
    }

    onDownloadMonthlyStoreIn() {
        this.bizSvc.onDownloadMonthlyStoreIn();
    }

}
