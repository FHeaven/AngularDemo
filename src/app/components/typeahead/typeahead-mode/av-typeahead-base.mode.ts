import { AvTypeaheadCompWebInfo } from './../av-typeahead.domain';
import { AvTypeaheadComponent, AvTypeaheadDisplayItem } from '../..';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';
declare var $: any;

export abstract class AvTypeaheadBaseMode {

    protected tahCompWebInfo: AvTypeaheadCompWebInfo;

    constructor(protected compInstance: AvTypeaheadComponent) {
        this.tahCompWebInfo = compInstance.tahCompWebInfo;
    }

    /**
     * Subscribe enter keyboard on input.
     * @param txtInput
     */
    private subscribeInputEnterEvent(txtInput: any): void {
        Observable.fromEvent(txtInput, 'keyup')
            .takeWhile(() => this.compInstance.AV_TYPEAHEAD_IS_ALIVE)
            .map((event: any) => event)
            .filter(event => event.keyCode === 13 && this.tahCompWebInfo.isShowDropdown)
            .subscribe((event) => {
                this.onSelect();
                txtInput.blur();
            });
    }

    /**
     * When press up/down, find the next focus index
     */
    private getNextDropdownFocusIndex(eventName: string, upDownDataSource: any): number {
        let focusIndex = -1;
        if (_.size(upDownDataSource) > 0) {
            focusIndex = eventName === 'up' ? _.size(upDownDataSource) - 1 : 0;
        }
        return focusIndex;
    }

    /**
     * If no focus, return all current display data source.
     * If has focus, exclude current on-focus item.
     */
    private getTempDisplayDataSource(thisFocusIndex: number): any {
        const { displayDataSource } = this.tahCompWebInfo;
        if (thisFocusIndex === -1) {
            return [...displayDataSource];
        }
        return [
            ...(displayDataSource.slice(thisFocusIndex + 1)),
            ...(displayDataSource.slice(0, thisFocusIndex))
        ];
    }

    /**
     * After set onFocus class, then sroll container if necessory.
     */
    protected scrollDropdownContainer(): void {
        setTimeout(() => {
            let ulSelectionPool, liOnFocus, maxHeight, visible_top, visible_bottom, high_top, high_bottom;
            const { id } = this.tahCompWebInfo;
            ulSelectionPool = $(`#${id} .dropdown-select-container>ul`);
            liOnFocus = $('li.onFocus', ulSelectionPool);
            if (liOnFocus.length > 0) {
                maxHeight = parseInt(ulSelectionPool.css('maxHeight'), 10);
                visible_top = ulSelectionPool.scrollTop();
                visible_bottom = maxHeight + visible_top;
                high_top = liOnFocus.position().top + visible_top;
                high_bottom = high_top + liOnFocus.outerHeight();
                if (high_bottom >= visible_bottom) {
                    ulSelectionPool.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
                } else if (high_top < visible_top) {
                    ulSelectionPool.scrollTop(high_top);
                }
            }
        });
    }

    /**
     * When press arrow up/down on input textbox, then set onFocus to dropdown list item.
     * @param txtInput
     */
    private subscribeInputUpDownEvent(txtInput: any): void {
        Observable.fromEvent(txtInput, 'keyup')
            .takeWhile(() => this.compInstance.AV_TYPEAHEAD_IS_ALIVE)
            .map((event: any) => event)
            .filter(event => _.includes([38, 40], event.keyCode)
                && this.tahCompWebInfo.isShowDropdown)
            .map(event => event.keyCode === 38 ? 'up' : 'down')
            .subscribe((eventName) => {
                const { displayDataSource } = this.tahCompWebInfo;
                if (_.size(displayDataSource) > 1) {
                    const thisFocusIndex = _.findIndex(displayDataSource, { isFocus: true });
                    // Blur from current focus item
                    if (thisFocusIndex !== -1) {
                        displayDataSource[thisFocusIndex].isFocus = false;
                        this.tahCompWebInfo.onFocusValue = '';
                    }

                    // Focus on the next item.
                    const upDownDataSource = this.getTempDisplayDataSource(thisFocusIndex);
                    const newFocusIndex = this.getNextDropdownFocusIndex(eventName, upDownDataSource);
                    if (newFocusIndex !== -1) {
                        upDownDataSource[newFocusIndex].isFocus = true;
                        this.tahCompWebInfo.onFocusValue = upDownDataSource[newFocusIndex].value;
                    }

                    // Scroll the scrollbar
                    this.scrollDropdownContainer();
                }
            });
    }

    private escapeRegexp(queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    /**
     * Get ul -> li html string.
     */
    private getListItemHtml(selectItemValue, inputValue) {
        let result = selectItemValue;
        if (!_.isEmpty(selectItemValue) && !_.isEmpty(inputValue)) {
            const regRule = new RegExp(this.escapeRegexp(inputValue), 'gi');
            result = selectItemValue.replace(regRule, '<strong>$&</strong>');
            result = result.replace(new RegExp(/ /, 'gi'), '&nbsp;');
        }
        return result;
    }

    /**
     * Get ui -> li display object
     */
    protected getListItemDisplayObject(selectItemValue: string): AvTypeaheadDisplayItem {
        const { inputValue } = this.tahCompWebInfo;
        const htmlValue = this.getListItemHtml(selectItemValue, inputValue);
        return { value: selectItemValue, htmlValue: htmlValue, isFocus: false };
    }

    /**
     * Set the default highlight item on the dropdown list.
     */
    protected setDefaultFocusItem(): void {
        const firstFilteredValue = _.first(this.tahCompWebInfo.displayDataSource);
        if (firstFilteredValue !== undefined) {
            firstFilteredValue.isFocus = true;
            this.tahCompWebInfo.onFocusValue = firstFilteredValue.value;
        } else {
            this.tahCompWebInfo.onFocusValue = '';
        }
    }

    /**
     * When mouse over on dropdown item, remove others focus status.
     * If dropdown item is active item, then set focus status to it.
     * @param mouseOverItem Dropdown item.
     */
    onDropdownItemMouseOver(mouseOverItem: AvTypeaheadDisplayItem): void {
        _.each(this.tahCompWebInfo.displayDataSource, loopItem => {
            loopItem.isFocus = false;
        });
        this.tahCompWebInfo.onFocusValue = mouseOverItem.value;
        mouseOverItem.isFocus = true;
    }

    /**
     * Subscribe the input events
     */
    subscribeInput(): void {
        const txtInput = document.getElementById(this.tahCompWebInfo.inputId);
        this.subscribeInputEnterEvent(txtInput);
        this.subscribeInputUpDownEvent(txtInput);
    }

    /**
     * When trigger select action
     */
    onSelect(): void {
        const { onFocusValue, orginalInputValue } = this.tahCompWebInfo;
        const displayText = this.tahCompWebInfo.callbackFn.getCustomDisplayText(onFocusValue);
        this.tahCompWebInfo.inputValue = displayText;
        this.tahCompWebInfo.isShowDropdown = false;
        if (displayText !== orginalInputValue) {
            this.tahCompWebInfo.callbackFn.onChanged(displayText);
            this.tahCompWebInfo.orginalInputValue = displayText;
        }
    }

    /**
     * When input changed
     */
    abstract onInputChanged();
}
