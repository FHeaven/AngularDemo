import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, ApplyHeadInfo } from 'app/domain';

@Injectable()
export class GetApplyHdListApiService {

    progCode = 'API012';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getApiUrl(this.progCode);
        this.baseApiService.call<any, ApplyHeadInfo[]>(request);
    }

}
