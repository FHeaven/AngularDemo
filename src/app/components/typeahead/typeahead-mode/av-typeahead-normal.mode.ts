import { AvTypeaheadBaseMode } from './av-typeahead-base.mode';
import * as _ from 'lodash';
declare var $: any;

export class AvTypeaheadNormalMode extends AvTypeaheadBaseMode {

    onInputChanged() {
        const tahCompWebInfo = this.tahCompWebInfo;
        if (_.isEmpty(tahCompWebInfo.inputValue)) {
            tahCompWebInfo.onFocusValue = '';
            tahCompWebInfo.isShowDropdown = false;
        } else {
            const { inputValue } = tahCompWebInfo;
            const { dataSource } = tahCompWebInfo.initData;
            const upperCaseIputValue = inputValue.toUpperCase();

            // Get satisfy input value data items.
            tahCompWebInfo.displayDataSource = _.concat(
                _.chain(dataSource)
                    .filter(item => item.toUpperCase().indexOf(upperCaseIputValue) === 0)
                    .map(item => super.getListItemDisplayObject(item))
                    .value(),
                _.chain(dataSource)
                    .filter(item => item.toUpperCase().indexOf(upperCaseIputValue) > 0)
                    .map(item => super.getListItemDisplayObject(item))
                    .value()
            );

            // If not exists any, then show all.
            if (_.isEmpty(tahCompWebInfo.displayDataSource)) {
                tahCompWebInfo.displayDataSource = _.map(dataSource,
                    item => {
                       return super.getListItemDisplayObject(item);
                    });
            }

            // Set the detault focst item.
            super.setDefaultFocusItem();

            // Scroll and show dropdown list.
            if (!_.isEmpty(tahCompWebInfo.displayDataSource)) {
                tahCompWebInfo.isShowDropdown = true;
                super.scrollDropdownContainer();
            }
        }
    }
}
