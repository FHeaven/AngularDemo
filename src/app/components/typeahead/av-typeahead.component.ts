import { AvTypeaheadBizService } from './av-typeahead.biz.service';
import { AvTypeaheadCompConfigInput, AvTypeaheadCompWebInfo, AvTypeaheadDisplayItem, EnumAvTypeaheadMode } from './av-typeahead.domain';
import { AvTypeaheadComponentApi } from './av-typeahead.component-api';
import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { AvTypeaheadBaseMode } from './typeahead-mode/av-typeahead-base.mode';
import { AvTypeaheadNormalMode } from './typeahead-mode/av-typeahead-normal.mode';
import { AvTypeaheadLazyLoadDataSourceMode } from './typeahead-mode/av-typeahead-lazy-load-data-source.mode';
import * as _ from 'lodash';

@Component({
    selector: 'app-av-typeahead',
    templateUrl: './av-typeahead.component.html',
    styleUrls: ['./av-typeahead.component.scss'],
    providers: [AvTypeaheadBizService]
})
export class AvTypeaheadComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Input confirm from parent component
     */
    @Input() compConfig: AvTypeaheadCompConfigInput;

    /**
     * The component display info for current component.
     */
    tahCompWebInfo: AvTypeaheadCompWebInfo;

    /**
     * Typeahead mode instance
     */
    tahModeInstance: AvTypeaheadBaseMode;

    AV_TYPEAHEAD_IS_ALIVE = true;

    constructor(private bizSvc: AvTypeaheadBizService) { }

    ngOnInit() {
        this.tahCompWebInfo = this.bizSvc.initCompWebInfo(this.compConfig);
        this.compConfig.componentApi = new AvTypeaheadComponentApi(this.tahCompWebInfo);
        this.tahModeInstance = this.getTypeaheadModeInstance(this.tahCompWebInfo.mode);
    }

    ngAfterViewInit() {
        this.tahModeInstance.subscribeInput();
    }

    ngOnDestroy() {
        this.AV_TYPEAHEAD_IS_ALIVE = false;
    }

    /**
     * Return Av-Typeahead Mode instance
     */
    private getTypeaheadModeInstance(mode: EnumAvTypeaheadMode) {
        switch (mode) {
            case EnumAvTypeaheadMode.Normal:
                return new AvTypeaheadNormalMode(this);
            case EnumAvTypeaheadMode.LazyLoadDataSource:
                return new AvTypeaheadLazyLoadDataSourceMode(this);
            default: return new AvTypeaheadNormalMode(this);
        }
    }

    /**
     * When mouse over on dropdown item, remove others focus status.
     * If dropdown item is active item, then set focus status to it.
     * @param mouseOverItem Dropdown item.
     */
    onDropdownItemMouseOver(mouseOverItem: AvTypeaheadDisplayItem): void {
        this.tahModeInstance.onDropdownItemMouseOver(mouseOverItem);
    }

    /**
     * Click to select or press enter to select.
     */
    onSelect(): void {
        this.tahModeInstance.onSelect();
    }

    /**
     * When blur from input, default select highlight item. (keep in onFocusValue)
     */
    onInputBlur(): void {
        this.onSelect();
        this.tahCompWebInfo.callbackFn.onInputBlur();
    }

    onInputChanged(): void {
        this.tahModeInstance.onInputChanged();
    }

    /**
     * Call when focus on input.
     */
    onInputFocus(): void {
        this.tahCompWebInfo.callbackFn.onInputFocus();
    }

}
