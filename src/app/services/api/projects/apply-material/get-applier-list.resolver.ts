import { Injectable, state } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { ApiResponseInfo } from 'app/domain';
import { GetApplierListApiService } from './get-applier-list.api.service';

@Injectable()
export class GetApplierListResolver implements Resolve<ApiResponseInfo<string[]>> {

    constructor(private apiService: GetApplierListApiService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiResponseInfo<string[]>> {
        return this.apiService.post({
            requestJson: {
                isCompleted: route.data.isCompleted
            }
        });
    }

}
