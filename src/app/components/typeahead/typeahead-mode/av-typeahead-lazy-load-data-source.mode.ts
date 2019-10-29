import { AvTypeaheadBaseMode } from './av-typeahead-base.mode';
import { AvTypeaheadCompWebInfo } from './../av-typeahead.domain';
import { AvTypeaheadComponent, AvTypeaheadDisplayItem } from '../..';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';
declare var $: any;

export class AvTypeaheadLazyLoadDataSourceMode extends AvTypeaheadBaseMode {

    private debounceCtrl = {
        timeoutId: null,
        delta: 200
    };

    /**
     * Call API for
     */
    onInputChanged() {
        const { timeoutId, delta } = this.debounceCtrl;
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        this.debounceCtrl.timeoutId = setTimeout(() => {
            const tahCompWebInfo = this.tahCompWebInfo;
            const { inputValue } = tahCompWebInfo;
            if (_.isEmpty(inputValue)) {
                tahCompWebInfo.onFocusValue = '';
                tahCompWebInfo.isShowDropdown = false;
            } else {
                tahCompWebInfo.callbackFn.getLazyDataSource(inputValue,
                    (lazyDataSource: string[]) => {
                        if (!_.isEmpty(lazyDataSource)) {
                            // If not empty, then show dropdown
                            tahCompWebInfo.displayDataSource = _.map(lazyDataSource, item => super.getListItemDisplayObject(item));

                            // Set the detault focst item.
                            super.setDefaultFocusItem();

                            tahCompWebInfo.isShowDropdown = true;
                            // Scroll the scrollbar
                            super.scrollDropdownContainer();
                        } else {
                            // If empty, then hide dropdown
                            tahCompWebInfo.displayDataSource = [];
                            tahCompWebInfo.isShowDropdown = false;
                        }
                    });
            }
        }, delta);

    }

}
