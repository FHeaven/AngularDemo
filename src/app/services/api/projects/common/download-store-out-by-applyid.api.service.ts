import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, DownloadStoreOutByApplyIdRequestInfo } from 'app/domain';

@Injectable()
export class DownloadStoreOutByApplyIdApiService {

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<DownloadStoreOutByApplyIdRequestInfo>) {
        request.url = this.progCodeDataService.getApiUrl('API015');
        request.requestJson.token = this.progCodeDataService.getToken();
        this.baseApiService.call<DownloadStoreOutByApplyIdRequestInfo, string>(request, false);
    }
}
