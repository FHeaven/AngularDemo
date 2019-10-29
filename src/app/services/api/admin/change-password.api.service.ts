import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, UserInfo } from 'app/domain';

@Injectable()
export class ChangePasswordApiService {

    progCode = '';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    /**
     * {old_password:'', new_password:''}
     */
    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getApiUrl('API003');
        this.baseApiService.call<any, any>(request);
    }

}
