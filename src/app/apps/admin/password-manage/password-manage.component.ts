import { Component, OnInit } from '@angular/core';
import { PasswordManageBizService } from './password-manage.biz.service';
import { AppBaseComponent } from 'app/apps/app-base-component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FoundationService } from 'app/services';

@Component({
    selector: 'app-password-manage',
    templateUrl: './password-manage.component.html',
    styleUrls: ['./password-manage.component.scss']
})
export class PasswordManageComponent extends AppBaseComponent implements OnInit {

    errorMessage = '';

    oldPassword: any = '';
    newPassword: any = '';
    newPassword2: any = '';

    constructor(
        private foundationSvc: FoundationService,
        private bizSvc: PasswordManageBizService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.bizSvc.setComponent(this);
    }

    reset() {
        this.oldPassword = '';
        this.newPassword = '';
        this.newPassword2 = '';
    }

    changePassword() {
        if (this.newPassword !== this.newPassword2) {
            this.foundationSvc.onError('密码修改失败！');
            this.errorMessage = '两次输入的密码不相同，请重新输入！';
        } else {
            this.bizSvc.changePassword(this.oldPassword, this.newPassword);
        }
    }


}
