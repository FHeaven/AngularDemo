import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, LoginDataInfo, ApiResponseInfo } from 'app/domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetLoginDataApiService {

    progCode = '';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getLoginDataUrl();
        this.baseApiService.call<any, LoginDataInfo>(request);
    }

    post(request: ApiRequestInfo<any>): Observable<ApiResponseInfo<LoginDataInfo>> {
        request.url = this.progCodeDataService.getLoginDataUrl();
        return this.baseApiService.post<any, LoginDataInfo>(request);
    }

}
