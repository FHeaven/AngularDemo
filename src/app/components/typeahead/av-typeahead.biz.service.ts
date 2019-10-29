import { Injectable } from '@angular/core';
import { AvTypeaheadCompConfigInput, AvTypeaheadCompWebInfo, EnumAvTypeaheadMode } from './av-typeahead.domain';
import * as _ from 'lodash';

@Injectable()
export class AvTypeaheadBizService {

    constructor() { }

    /**
     * Initial the Component Web info by user input compConfig and default value.
     * @param inputConfigConfig CompConfig input by parent component
     */
    initCompWebInfo(inputConfigConfig: AvTypeaheadCompConfigInput): AvTypeaheadCompWebInfo {
        const inputSelectedValue = _.get(inputConfigConfig, 'initData.selectedValue', '');
        // Default config
        const defaultCompConfig: AvTypeaheadCompWebInfo = {
            id: _.uniqueId('av_typeahead_id_'),
            inputId: _.uniqueId('av_typeahead_inputId_'),
            isEnable: true,
            mode: EnumAvTypeaheadMode.Normal, // HF20181010.n
            inputPlaceHolder: '',
            initData: {
                selectedValue: '',
                dataSource: [],
            },
            callbackFn: {
                onChanged: (selectedValue: string) => { },
                onInputFocus: () => { },
                onInputBlur: () => { },
                getCustomDisplayText: (selectedValue: string) => {
                    return selectedValue;
                },
                getLazyDataSource: (inputValue: string, callbackFn: Function) => {
                    callbackFn([]);
                }
            },
            displayDataSource: [],
            inputValue: inputSelectedValue,
            orginalInputValue: inputSelectedValue,
            onFocusValue: inputSelectedValue,
        };
        // Merge:
        // Default config maintains all properties.
        // If in default but not in input, then keep default.
        // If in default and in input, merge for object and array and replace for boolean, number, string.
        _.merge(defaultCompConfig, inputConfigConfig);

        return defaultCompConfig;
    }

}
