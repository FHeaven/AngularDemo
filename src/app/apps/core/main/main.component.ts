import { ProgCodeDataService, FoundationService } from 'app/services';
import { MainBizService } from './main.biz.service';
import { Component, OnInit, trigger, state, style, transition, keyframes, animate } from '@angular/core';
import { MenuBarInfo } from 'app/domain';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { AppBaseComponent } from 'app/apps/app-base-component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: [
        trigger('toogleSideBar', [
            state('nav-out', style({ left: '0px', width: '100%' })),
            state('nav-in', style({ left: '-350px', width: '0' })),
            transition('nav-in => nav-out', [
                animate(280, keyframes([
                    style({ left: '-350px', width: '0', offset: 0 }),
                    style({ left: '0px', width: '100%', offset: 1 })
                ]))
            ]),
            transition('nav-out => nav-in', [
                animate(280, keyframes([
                    style({ left: '0px', width: '100%', offset: 0 }),
                    style({ left: '-350px', width: '0', offset: 1 })
                ]))
            ])
        ])
    ]
})
export class MainComponent extends AppBaseComponent implements OnInit {

    menuList: MenuBarInfo[] = [];

    mainPageCtrl;

    constructor(
        private bizService: MainBizService,
        private router: Router,
        private foundationSvc: FoundationService,
        private progCodeDataService: ProgCodeDataService,
        protected activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
        if (_.isEmpty(this.progCodeDataService.getToken())) {
            this.router.navigate(['dream/login']);
        }
    }

    ngOnInit() {
        const loginData = super.getApiResovleData('loginData');
        this.progCodeDataService.takeLoginData(loginData);
        this.menuList = this.bizService.getMenuList();
        this.mainPageCtrl = this.progCodeDataService.mainPageCtrl;
    }

    logout() {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.progCodeDataService.removeToken();
        this.router.navigate(['dream/login']).then(() => {
            this.foundationSvc.closeProcessLayer(layerIndex);
        });
    }

    toogleBar() {
        if (this.mainPageCtrl.sideBar === 'nav-in') {
            this.mainPageCtrl.sideBar = 'nav-out';
        } else {
            this.mainPageCtrl.sideBar = 'nav-in';
        }
    }

    goHome() {
        const layerIndex = this.foundationSvc.showProcessLayer();
        this.router.navigate(['dream/home']).then(() => {
            this.progCodeDataService.setCurrentPage('首页');
            this.foundationSvc.closeProcessLayer(layerIndex);
        });
    }

    getCurrentProgName() {
        return this.progCodeDataService.getCurrentPage();
    }

    getUserName() {
        return _.get(this.progCodeDataService.USER_INFO, 'user_name', '');
    }

}
