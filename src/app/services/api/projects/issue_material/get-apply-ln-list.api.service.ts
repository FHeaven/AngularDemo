import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, ApplyDetailInfo } from 'app/domain';

@Injectable()
export class GetApplyLnListApiService {

    progCode = 'API013';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getApiUrl(this.progCode);
        this.baseApiService.call<any, ApplyDetailInfo[]>(request);
    }

}
