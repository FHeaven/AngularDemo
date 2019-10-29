import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { ApiResponseInfo, MaterialInfo } from 'app/domain';
import { GetMaterialsApiService } from './get-materials.api.service';

@Injectable()
export class GetMaterialsResolver implements Resolve<ApiResponseInfo<MaterialInfo[]>> {

    constructor(private apiService: GetMaterialsApiService) {
    }

    resolve(): Observable<ApiResponseInfo<MaterialInfo[]>> {
        return this.apiService.post({
            requestJson: null
        });
    }

}
