import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, MaterialInfo, ApiResponseInfo } from 'app/domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetMaterialsApiService {

    progCode = 'API004';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getApiUrl(this.progCode);
        this.baseApiService.call<any, MaterialInfo[]>(request);
    }

    post(request: ApiRequestInfo<any>): Observable<ApiResponseInfo<MaterialInfo[]>> {
        request.url = this.progCodeDataService.getApiUrl(this.progCode);
        return this.baseApiService.post<any, MaterialInfo[]>(request);
    }

}
