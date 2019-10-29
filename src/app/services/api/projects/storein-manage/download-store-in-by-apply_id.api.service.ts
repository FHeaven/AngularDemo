import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, DownloadStoreInByApplyIdRequestInfo } from 'app/domain';

@Injectable()
export class DownloadStoreInByApplyIdApiService {

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<DownloadStoreInByApplyIdRequestInfo>) {
        request.url = this.progCodeDataService.getApiUrl('API014');
        request.requestJson.token = this.progCodeDataService.getToken();
        this.baseApiService.call<DownloadStoreInByApplyIdRequestInfo, string>(request, false);
    }
}
