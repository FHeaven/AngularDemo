import { Injectable } from '@angular/core';
import { ChangePasswordApiService } from 'app/services/api';
import { ApiResponseInfo, UserInfo } from 'app/domain';
import * as _ from 'lodash';
import { PasswordManageComponent } from './password-manage.component';
import { ProgCodeDataService, FoundationService } from 'app/services';
import * as moment from 'moment';

@Injectable()
export class PasswordManageBizService {

    private compInstance: PasswordManageComponent = null;

    constructor(
        private foundationSvc: FoundationService,
        private changePswApiService: ChangePasswordApiService
    ) { }

    setComponent(compInstance: PasswordManageComponent) {
        this.compInstance = compInstance;
    }

    changePassword(oldPassword: string, newPassword: string) {
        oldPassword = this.foundationSvc.encodeMD5(oldPassword);
        newPassword = this.foundationSvc.encodeMD5(newPassword);
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.changePswApiService.call({
            requestJson: {
                old_password: oldPassword,
                new_password: newPassword
            },
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                this.foundationSvc.onSuccess('密码修改成功！');
                this.compInstance.errorMessage = '';
                this.compInstance.reset();
            },
            onFailed: (errorResponse: ApiResponseInfo<string>) => {
                this.foundationSvc.onError('密码修改失败！');
                this.compInstance.errorMessage = errorResponse.message;
            },
            onResponse: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

}
