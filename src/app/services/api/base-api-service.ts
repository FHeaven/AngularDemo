import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRequestInfo, ApiResponseInfo } from 'app/domain';

import * as _ from 'lodash';
import { ProgCodeDataService } from './../data/prog-code/prog-code.data.service';
import { Observable } from 'rxjs/Observable';
import { FoundationService } from 'app/services/utility/foundation.service';

@Injectable()
export class BaseApiService {

    constructor(
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        private httpClient: HttpClient
    ) { }

    private getRequestBody(requstJson: any, needToken: boolean = true) {
        let body: any = requstJson;
        if (needToken) {
            body = [
                {
                    token: this.progCodeDataService.getToken()
                }
            ];
            if (requstJson !== null) {
                body.push(requstJson);
            }
        }
        return body;
    }

    post<T, U>(request: ApiRequestInfo<T>, needToken: boolean = true): Observable<ApiResponseInfo<U>> {

        const body = this.getRequestBody(request.requestJson, needToken);

        return this.httpClient.post<ApiResponseInfo<U>>(request.url, body);
    }

    call<T, U>(request: ApiRequestInfo<T>, needToken: boolean = true) {
        const body = this.getRequestBody(request.requestJson, needToken);

        this.httpClient.post<ApiResponseInfo<U>>(request.url, body).subscribe(
            // Success call API
            (response: ApiResponseInfo<U>) => {
                if (response.result === '0000000') {
                    if (_.isFunction(request.onSuccessFn)) {
                        request.onSuccessFn(response);
                    }
                } else {
                    if (_.isFunction(request.onFailed)) {
                        request.onFailed(response);
                    } else {
                        this.foundationSvc.onError(response.message, response.result);
                    }
                }
            },
            // Network issue
            (error: any) => {
                if (_.isFunction(request.onFailed)) {
                    request.onFailed({
                        message: '网络连接异常.',
                        result: '900000'
                    });
                }
                if (_.isFunction(request.onResponse)) {
                    request.onResponse();
                }
            },
            // Compeleted
            () => {
                if (_.isFunction(request.onResponse)) {
                    request.onResponse();
                }
            }
        );
    }

}
