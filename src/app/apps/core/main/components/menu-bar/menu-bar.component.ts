
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuBarInfo } from 'app/domain';
import * as _ from 'lodash';
import { ProgCodeDataService, FoundationService } from 'app/services';

@Component({
    selector: 'app-menu-bar',
    styleUrls: ['./menu-bar.component.scss'],
    templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent implements OnInit {

    @Input()
    menuList: MenuBarInfo[];

    constructor(
        private progCodeDataSvc: ProgCodeDataService,
        private foundationSvc: FoundationService,
        private router: Router) { }

    ngOnInit(): void { }

    hideMenuItem(menuItem: MenuBarInfo): void {
        menuItem.showSubMenuItems = 'in';
        if (menuItem.subMenuList.length > 0) {
            menuItem.subMenuList.forEach((subMenuItem) => this.hideMenuItem(subMenuItem));
        }
    }

    showMenuItem(checkMenuList: MenuBarInfo[], clickMenuItem: MenuBarInfo): boolean {
        let isShowOut = false, isShowParent = false;
        checkMenuList.forEach((loopMenuItem) => {
            if (loopMenuItem.subMenuList.length > 0) {
                isShowOut = loopMenuItem === clickMenuItem ? true : this.showMenuItem(loopMenuItem.subMenuList, clickMenuItem);
                if (isShowOut === true) {
                    isShowParent = true;
                    loopMenuItem.showSubMenuItems = 'out';
                } else {
                    loopMenuItem.showSubMenuItems = 'in';
                }
            }
        });
        return isShowParent;
    }

    toogleSubMenuItems(clickMenuItem: MenuBarInfo): void {
        if (clickMenuItem.subMenuList.length > 0) {
            if (clickMenuItem.showSubMenuItems === 'out') {
                this.hideMenuItem(clickMenuItem);
            } else {
                this.showMenuItem(this.menuList, clickMenuItem);
            }
        } else {
            const layerIndex = this.foundationSvc.showProcessLayer();
            this.progCodeDataSvc.setCurrentPage(clickMenuItem.menuName);
            this.router.navigate([clickMenuItem.url]).then(() => {
                this.foundationSvc.closeProcessLayer(layerIndex);
            });
        }
    }
}
