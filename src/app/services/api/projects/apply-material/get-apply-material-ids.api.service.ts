import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, ApplyMaterialInfo, ApiResponseInfo } from 'app/domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetApplyMaterialIdsApiService {

    progCode = 'API010';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getApiUrl(this.progCode);
        this.baseApiService.call<any, String[]>(request);
    }

}
