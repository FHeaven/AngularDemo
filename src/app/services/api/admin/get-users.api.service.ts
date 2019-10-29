import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, UserInfo } from 'app/domain';

@Injectable()
export class GetUsersApiService {

    progCode = '';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<any>) {
        request.url = this.progCodeDataService.getApiUrl('API002');
        this.baseApiService.call<any, UserInfo[]>(request);
    }

}
