import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, StoreInInfo, ApiResponseInfo } from 'app/domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetStoreInsApiService {

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getApiUrl('API007');
        this.baseApiService.call<any, StoreInInfo[]>(request);
    }

    post(request: ApiRequestInfo<any>): Observable<ApiResponseInfo<StoreInInfo[]>> {
        request.url = this.progCodeDataService.getApiUrl('API007');
        return this.baseApiService.post<any, StoreInInfo[]>(request);
    }

}
