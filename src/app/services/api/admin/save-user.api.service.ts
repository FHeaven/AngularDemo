import { Injectable } from '@angular/core';
import { ProgCodeDataService } from 'app/services/data/prog-code/prog-code.data.service';
import { BaseApiService } from 'app/services/api/base-api-service';
import { ApiRequestInfo, UserInfo, ProgCodeInfo } from 'app/domain';
import * as _ from 'lodash';

@Injectable()
export class SaveUserApiService {

    progCode = '';

    allUserAuth = [{
        prog_code: 'Page003',
        prog_name: '物料维护',
        prog_type: 'PAGE',
        icon: 'fas fa-clipboard-list',
        url: 'dream/projects/material-manage',
        c: 'Y',
        r: 'Y',
        u: 'Y',
        d: 'Y'
    }, {
        prog_code: 'Page004',
        prog_name: '库存管理',
        prog_type: 'PAGE',
        icon: 'fas fa-coins',
        url: 'dream/projects/respository-manage',
        c: 'Y',
        r: 'Y',
        u: 'Y',
        d: 'Y'
    }, {
        prog_code: 'Page005',
        prog_name: '物料申请',
        prog_type: 'PAGE',
        icon: 'fas fa-cart-arrow-down',
        url: 'dream/projects/apply-material',
        c: 'Y',
        r: 'Y',
        u: 'Y',
        d: 'Y'
    }, {
        prog_code: 'Page006',
        prog_name: '发料管理',
        prog_type: 'PAGE',
        icon: 'fas fa-box-open',
        url: 'dream/projects/issue-material',
        c: 'Y',
        r: 'Y',
        u: 'Y',
        d: 'Y'
    }, {
        prog_code: 'Page007',
        prog_name: '报表下载',
        prog_type: 'PAGE',
        icon: 'fas fa-file-download',
        url: 'dream/projects/download-report',
        c: 'Y',
        r: 'Y',
        u: 'Y',
        d: 'Y'
    }, {
        prog_code: 'Page001',
        prog_name: '用户管理',
        prog_type: 'PAGE',
        icon: 'fas fa-users',
        url: 'dream/admin/user-manage',
        c: 'Y',
        r: 'Y',
        u: 'Y',
        d: 'Y'
    }, {
        prog_code: 'Page002',
        prog_name: '密码管理',
        prog_type: 'PAGE',
        icon: 'fas fa-lock',
        url: 'dream/admin/password-manage',
        c: 'Y',
        r: 'Y',
        u: 'Y',
        d: 'Y'
    }];

    constructor(
        private progCodeDataService: ProgCodeDataService,
        private baseApiService: BaseApiService
    ) { }

    call(request: ApiRequestInfo<UserInfo>) {
        request.url = this.progCodeDataService.getApiUrl('API001');
        this.baseApiService.call<UserInfo, string>(request);
    }

    getUserAuthList(userInfo: UserInfo): ProgCodeInfo[] {
        let thisUserAuth = this.allUserAuth;
        if (userInfo.is_admin !== 'Y') {
            thisUserAuth = _.filter(thisUserAuth, (auth: ProgCodeInfo) => {
                return _.includes(['Page005', 'Page001', 'Page002', 'Page007'], auth.prog_code);
            });
        }
        return thisUserAuth;
    }

}
