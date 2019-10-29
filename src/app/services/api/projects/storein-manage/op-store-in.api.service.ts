import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, StoreInInfo } from 'app/domain';

@Injectable()
export class OpStoreInApiService {

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<StoreInInfo[]>) {
        request.url = this.progCodeDataService.getApiUrl('API006');
        this.baseApiService.call<StoreInInfo[], string>(request);
    }
}
