import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, ApplyMaterialInfo } from 'app/domain';

@Injectable()
export class OpApplyMaterialApiService {

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<ApplyMaterialInfo[]>) {
        request.url = this.progCodeDataService.getApiUrl('API008');
        this.baseApiService.call<ApplyMaterialInfo[], string>(request);
    }
}
