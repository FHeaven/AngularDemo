import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/pluck';
import { Observable } from 'rxjs/Observable';

export class AppBaseComponent {

    constructor(protected activatedRoute: ActivatedRoute) { }

    canDeactivate = (): Observable<boolean> | Promise<boolean> | boolean => {
        return true;
    }

    canActivate = () => {
        return true;
    }

    getApiResovleData(key: string): any {
        let responseObj;
        const response$ = this.activatedRoute.data.pluck(key);
        response$.subscribe(x => responseObj = x);
        if (!responseObj || responseObj.result !== '0000000') {
            return undefined;
        }
        return responseObj.responseObject;
    }
}
