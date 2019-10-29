import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, MaterialInfo } from 'app/domain';

@Injectable()
export class OpMaterialApiService {

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<MaterialInfo>) {
        request.url = this.progCodeDataService.getApiUrl('API005');
        this.baseApiService.call<MaterialInfo, string>(request);
    }
}
