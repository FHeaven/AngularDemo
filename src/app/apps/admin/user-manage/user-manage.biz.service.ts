import { Injectable } from '@angular/core';
import { SaveUserApiService, GetUsersApiService } from 'app/services/api';
import { ApiResponseInfo, UserInfo } from 'app/domain';
import * as _ from 'lodash';
import { UserManageComponent } from './user-manage.component';
import { ProgCodeDataService, FoundationService } from 'app/services';
import * as moment from 'moment';

@Injectable()
export class UserManageBizService {

    private compInstance: UserManageComponent = null;

    constructor(
        private foundationSvc: FoundationService,
        private saveUserApiService: SaveUserApiService,
        private getUsersApiService: GetUsersApiService,
        private progCodeDataService: ProgCodeDataService
    ) { }

    setComponent(compInstance: UserManageComponent) {
        this.compInstance = compInstance;
    }

    saveUser(user: UserInfo, action: string, onSuccessFn: Function) {
        user.prog_auth = this.saveUserApiService.getUserAuthList(user);
        if (action === 'C') {
            user.create_date_time = moment().format('YYYY-MM-DD HH:mm:ss');
            user.created_by = this.progCodeDataService.getCurrentUserInfo().user_name;
            user.password = this.foundationSvc.encodeMD5('123456');
        } else {
            user.update_date_time = moment().format('YYYY-MM-DD HH:mm:ss');
            user.updated_by = this.progCodeDataService.getCurrentUserInfo().user_name;
        }
        const tempUser = _.cloneDeep(user) as UserInfo;
        tempUser.action = action;
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.saveUserApiService.call({
            requestJson: tempUser,
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                onSuccessFn(user);
            },
            onResponse: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

    deleteUser(user: UserInfo, callbackFn?: Function) {
        const tempUser = _.cloneDeep(user) as UserInfo;
        tempUser.action = 'D';
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.saveUserApiService.call({
            requestJson: tempUser,
            onSuccessFn: (response: ApiResponseInfo<string>) => {
                if (callbackFn) {
                    callbackFn();
                }
            },
            onResponse: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

    displayTbodyContent() {
        const pagingObj = this.compInstance.pagingObj;
        const begin = (pagingObj.currentPageIndex - 1) * pagingObj.itemsPerPage;
        const end = begin + pagingObj.itemsPerPage;
        this.compInstance.lstDisplayUserInfo = this.compInstance.lstUserInfo.slice(begin, end);
        if (_.isEmpty(this.compInstance.lstDisplayUserInfo) && pagingObj.currentPageIndex !== 1) {
            pagingObj.currentPageIndex--;
            this.displayTbodyContent();
        }
    }

    queryUsers(inputQuery: string) {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.getUsersApiService.call({
            requestJson: {},
            onSuccessFn: (response: ApiResponseInfo<UserInfo[]>) => {
                if (!_.isEmpty(inputQuery)) {
                    inputQuery = inputQuery.toLocaleLowerCase();
                    response.responseObject = _.filter(response.responseObject, (userInfo: UserInfo) => {
                        return userInfo.user_id.toLocaleLowerCase().indexOf(inputQuery) !== -1 ||
                            userInfo.user_name.toLocaleLowerCase().indexOf(inputQuery) !== -1;
                    });
                }
                this.compInstance.isShowing = true;
                this.compInstance.lstUserInfo = _.orderBy(response.responseObject, ['user_name'], ['asc']);
                this.compInstance.pagingObj.currentPageIndex = 1;
                this.compInstance.pagingObj.totalItems = _.size(this.compInstance.lstUserInfo);
                this.displayTbodyContent();
            },
            onResponse: () => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            }
        });
    }

}
