import { AvTypeaheadComponentApi } from './av-typeahead.component-api';

export enum EnumAvTypeaheadMode {
    /**
     * Detault Mode
     */
    Normal,
    /**
     * When change input, call API for loading matched data source
     */
    LazyLoadDataSource
}


/**
 * Av-Typeahead callback function class
 */
export class AvTypeaheadCallbackFn {

    /**
     * Call when the selected value changed.
     *
     * Press enter or blur the select item, will trigger onInputBlur callback function.
     */
    onChanged?: (selectedValue: string) => void;

    /**
     * Call when input on focus
     */
    onInputFocus?: () => void;

    /**
     * Call when input on blur.
     */
    onInputBlur?: () => void;

    /**
     * Get custom display text
     */
    getCustomDisplayText?: (selectedValue: string) => string;

    /**
     * Get lazy data source
     */
    getLazyDataSource?: (inputValue: string, callbackFn: Function) => void;

}

/**
 * Av-Typeahead initial data structure
 */
export class AvTypeaheadInitData {

    /**
     * Selected value
     */
    selectedValue?: string;

    /**
     * The data source is bound to dropdown list.
     */
    dataSource?: string[];
}

export class AvTypeaheadCompConfigInput {

    /**
     * Default is _.uniqueId('av_typeahead_')
     */
    id?: string;

    /**
     * EnumAvTypeaheadMode.Normal
     */
    mode?: EnumAvTypeaheadMode;

    /**
     * Initial data when first time initial the component
     *
     * Default is { selectedValue:'', dataSource: [] }
     */
    initData?: AvTypeaheadInitData;

    /**
     * Input's placeholder
     */
    inputPlaceHolder?: string;

    /**
     * Set the component whether is enabled.
     */
    isEnable?: boolean;

    /**
     * The functions called from typeahead-component to parent component.
     */
    callbackFn?: AvTypeaheadCallbackFn;

    /**
     * The functions called from parent componet to typeahead-component.
     *
     * Please initial componentApi as {}
     */
    componentApi?: AvTypeaheadComponentApi;
}

/**
 * Used by component internal
 */
export class AvTypeaheadDisplayItem {
    value?: string;
    htmlValue?: string;
    isFocus?: boolean;
}

/**
 * Used by component internal
 */
export class AvTypeaheadCompWebInfo extends AvTypeaheadCompConfigInput {
    inputId?: string;
    inputValue?: string;
    orginalInputValue?: string;
    onFocusValue?: string;
    isShowDropdown?: boolean;
    displayDataSource?: AvTypeaheadDisplayItem[];
}
