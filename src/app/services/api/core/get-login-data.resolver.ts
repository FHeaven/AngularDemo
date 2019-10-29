import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { GetLoginDataApiService } from '.';
import { LoginDataInfo, ApiResponseInfo } from 'app/domain';

@Injectable()
export class GetLoginDataResolver implements Resolve<ApiResponseInfo<LoginDataInfo>> {

    constructor(private apiService: GetLoginDataApiService) {
    }

    resolve(): Observable<ApiResponseInfo<LoginDataInfo>> {
        return this.apiService.post({
            requestJson: null
        });
    }

}
