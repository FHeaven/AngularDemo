import { ProgCodeDataService } from './../../../services/data/prog-code/prog-code.data.service';
import { Component, OnInit } from '@angular/core';
import { UserManageBizService } from './user-manage.biz.service';
import { UserInfo } from 'app/domain';
import { AppBaseComponent } from 'app/apps/app-base-component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { FoundationService } from 'app/services';

@Component({
    selector: 'app-user-manage',
    templateUrl: './user-manage.component.html',
    styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent extends AppBaseComponent implements OnInit {

    pageIndex = 0;
    isAdmin = false;

    opUserInfo: UserInfo;
    tempUpdateInfo: UserInfo;
    lstUserInfo: UserInfo[];
    lstDisplayUserInfo: UserInfo[];
    isCreating = false;
    isUpdating = false;
    isShowing = false;
    errorMessage = '';
    inputQuery = '';
    currentPageIndex = 1;
    pagingObj = {
        itemsPerPage: 10,
        totalItems: 0,
        currentPageIndex: 1,
        onPageChange: (value) => {
            this.bizSvc.displayTbodyContent();
        }
    };

    constructor(
        private bizSvc: UserManageBizService,
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.bizSvc.setComponent(this);
        this.isAdmin = _.get(this.progCodeDataService.USER_INFO, 'is_admin', 'N') === 'Y';
        this.lstUserInfo = [];
        this.lstDisplayUserInfo = [];
    }

    addNewUser() {
        this.opUserInfo = new UserInfo();
        this.opUserInfo.is_admin = 'N';
        this.isCreating = true;
        this.isUpdating = false;
    }

    updateUser(opUserInfo: UserInfo) {
        this.opUserInfo = opUserInfo;
        this.tempUpdateInfo = _.cloneDeep(opUserInfo);
        this.isCreating = false;
        this.isUpdating = true;
    }

    cancel() {
        if (this.isUpdating) {
            _.extend(this.opUserInfo, this.tempUpdateInfo);
        }
        this.isCreating = false;
        this.isUpdating = false;
    }

    saveUser() {
        const action = this.isCreating ? 'C' : 'U';
        this.bizSvc.saveUser(this.opUserInfo, action, () => {
            this.isCreating = false;
            this.isUpdating = false;
            this.isShowing = false;
            this.queryUser();
            this.foundationSvc.onSuccess('保存成功');
        });
    }

    queryUser() {
        this.bizSvc.queryUsers(this.inputQuery);
    }

    deleteUser(userInfo: UserInfo) {
        this.foundationSvc.onConfirm(`是否确定删除用户“${userInfo.user_name}”`,
            (index, layero) => {
                this.bizSvc.deleteUser(userInfo, () => {
                    this.lstUserInfo = this.lstUserInfo.filter((user: UserInfo) => {
                        return user.user_id !== userInfo.user_id;
                    });
                    layero.close(index);
                    this.foundationSvc.onSuccess('删除成功');
                    this.pagingObj.totalItems = _.size(this.lstUserInfo);
                    this.bizSvc.displayTbodyContent();
                });
            });
    }

}
