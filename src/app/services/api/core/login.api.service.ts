import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, LoginInfo } from 'app/domain';

@Injectable()
export class LoginApiService {

    progCode = '';

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<LoginInfo>) {
        request.url = this.progCodeDataService.getLoginUrl();
        this.baseApiService.call<LoginInfo, string>(request, false);
    }

}
