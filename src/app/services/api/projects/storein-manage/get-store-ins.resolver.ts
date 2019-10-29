import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { ApiResponseInfo, StoreInInfo } from 'app/domain';
import { GetStoreInsApiService } from './get-store-ins.api.service';

@Injectable()
export class GetStoreInsResolver implements Resolve<ApiResponseInfo<StoreInInfo[]>> {

    constructor(private apiService: GetStoreInsApiService) {
    }

    resolve(): Observable<ApiResponseInfo<StoreInInfo[]>> {
        return this.apiService.post({
            requestJson: null
        });
    }

}
