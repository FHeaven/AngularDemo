import { AvTypeaheadCompWebInfo } from './av-typeahead.domain';

export class AvTypeaheadComponentApi {
    constructor(private tahCompWebInfo: AvTypeaheadCompWebInfo) { }

    /**
    * Dynamic reset data source and selected value after initial typeahead.
    */
    resetDataSourceAndSelectedValue(dataSource: string[] = [], selectedValue: string = '') {
        this.tahCompWebInfo.isShowDropdown = false;
        this.tahCompWebInfo.initData.dataSource = dataSource;
        this.setSelectedValue(selectedValue);

    }

    /**
     * Set selected value.
     */
    setSelectedValue(selectedValue: string = '') {
        this.tahCompWebInfo.initData.selectedValue = selectedValue;
        this.tahCompWebInfo.inputValue = selectedValue;
        this.tahCompWebInfo.orginalInputValue = selectedValue;
        this.tahCompWebInfo.onFocusValue = selectedValue;
    }

    /**
     * Return current selected items.
     */
    getSelectedValue(): string {
        return this.tahCompWebInfo.inputValue;
    }

    /**
     * Enable typeahead.
     */
    enableComponent(): void {
        this.tahCompWebInfo.isEnable = true;
    }
    /**
     * Disable typeahead.
     */
    disableComponent(): void {
        this.tahCompWebInfo.isEnable = false;
    }

    /**
     * Enable or disable typeahead
     * @param isEnable true or false
     */
    setComponentStatus(isEnable: boolean): void {
        this.tahCompWebInfo.isEnable = isEnable;
    }

}
