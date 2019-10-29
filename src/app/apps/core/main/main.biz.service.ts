import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MenuBarInfo } from 'app/domain';
import { ProgCodeDataService } from 'app/services';

@Injectable()
export class MainBizService {

    constructor(private sysDateSergice: ProgCodeDataService) {

    }

    getMenuList(): MenuBarInfo[] {
        return this.sysDateSergice.getMenuInfo();
    }
}
