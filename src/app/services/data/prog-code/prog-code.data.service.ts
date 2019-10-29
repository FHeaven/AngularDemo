import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ProgCodeInfo, MenuBarInfo, UserInfo, LoginDataInfo } from 'app/domain';

@Injectable()
export class ProgCodeDataService {

    sessionStorage: any = window.sessionStorage;
    mainPageCtrl = {
        sideBar: 'nav-out'
    };

    token;

    USER_INFO: UserInfo;

    CURRENT_PAGE_NAME: string;

    API_URL;

    MENU_INFO: MenuBarInfo[];

    getApiUrl(progCode: string): string {
        return this.getAllAPIUrl()[progCode];
    }

    getLoginUrl() {
        const windowObj = <any>window;
        const { SERVER_ADDRESS, LOGIN_URL } = windowObj.DREAM_BASE_CONFIG;
        return SERVER_ADDRESS + LOGIN_URL;
    }

    getLoginDataUrl() {
        const windowObj = <any>window;
        const { SERVER_ADDRESS, GET_LOGIN_DATA_URL } = windowObj.DREAM_BASE_CONFIG;
        return SERVER_ADDRESS + GET_LOGIN_DATA_URL;
    }

    getMenuInfo(): MenuBarInfo[] {
        return this.MENU_INFO;
    }

    takeLoginData(loginData: LoginDataInfo) {
        this.USER_INFO = loginData.user_info;

        this.MENU_INFO = _.chain(this.USER_INFO.prog_auth)
            .filter((progAuth: ProgCodeInfo) => {
                return progAuth.prog_type === 'PAGE' && progAuth.r === 'Y';
            }).map((progAuth: ProgCodeInfo) => {
                const menuBarInfo = new MenuBarInfo();
                menuBarInfo.menuName = progAuth.prog_name;
                menuBarInfo.icons = progAuth.icon;
                menuBarInfo.url = progAuth.url;
                menuBarInfo.showSubMenuItems = 'in';
                menuBarInfo.subMenuList = [];
                return menuBarInfo;
            }).value();

        const apiUrl = {};
        _.each(this.USER_INFO.prog_auth, (progAuth: ProgCodeInfo) => {
            if (progAuth.prog_type === 'API') {
                apiUrl[progAuth.prog_code] = (<any>window).DREAM_BASE_CONFIG.SERVER_ADDRESS +
                    progAuth.url;
            }
        });
        this.storeAPIUrl(apiUrl);
    }

    storeAPIUrl(apiUrl: any) {
        if (this.sessionStorage) {
            this.sessionStorage.setItem('api_url', JSON.stringify(apiUrl));
        }
        this.API_URL = apiUrl;
    }

    getAllAPIUrl() {
        if (!this.API_URL && this.sessionStorage) {
            this.API_URL = JSON.parse(this.sessionStorage.getItem('api_url'));
        }
        return this.API_URL;
    }

    storeToken(token: string) {
        if (this.sessionStorage) {
            this.sessionStorage.setItem('user_token', token);
        }
        this.token = token;
    }

    removeToken() {
        if (this.sessionStorage) {
            this.sessionStorage.removeItem('user_token');
        }
        this.token = '';
    }

    getToken() {
        if (!this.token && this.sessionStorage) {
            this.token = this.sessionStorage.getItem('user_token');
        }
        return this.token;
    }

    getCurrentUserInfo(): UserInfo {
        return this.USER_INFO;
    }

    setCurrentPage(pageName) {
        if (this.sessionStorage) {
            this.sessionStorage.setItem('current_page_name', pageName);
        }
        this.CURRENT_PAGE_NAME = pageName;
    }

    getCurrentPage() {
        if (!this.CURRENT_PAGE_NAME && this.sessionStorage) {
            this.CURRENT_PAGE_NAME = this.sessionStorage.getItem('current_page_name');
        }
        return this.CURRENT_PAGE_NAME;
    }
}
