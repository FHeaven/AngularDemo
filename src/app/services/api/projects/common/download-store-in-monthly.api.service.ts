import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo } from 'app/domain';
import { DownloadMonthlyReportRequestInfo } from 'app/apps/projects/download-monthly-report/download-monthly-report.info';

@Injectable()
export class DownloadStoreInMonthlyApiService {

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<DownloadMonthlyReportRequestInfo>) {
        request.url = this.progCodeDataService.getApiUrl('API017');
        request.requestJson.token = this.progCodeDataService.getToken();
        this.baseApiService.call<DownloadMonthlyReportRequestInfo, string>(request, false);
    }
}
