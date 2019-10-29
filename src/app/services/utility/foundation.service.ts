import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import md5 from 'js-md5';

@Injectable()
export class FoundationService {

    onSuccess(message: string, title: string = '') {
        if (_.isEmpty(message)) {
            (<any>window).toastr.success(message);
        } else {
            (<any>window).toastr.success(message, title);
        }
    }

    onError(message: string, title: string = '') {
        if (_.isEmpty(message)) {
            (<any>window).toastr.error(message);
        } else {
            (<any>window).toastr.error(message, title);
        }
    }

    onWarning(message: string, title: string = '') {
        if (_.isEmpty(message)) {
            (<any>window).toastr.warning(message);
        } else {
            (<any>window).toastr.warning(message, title);
        }
    }

    encodeMD5(inputString: string): string {
        return md5(inputString);
    }

    onConfirm(message: string, callbackFn: Function) {
        const layer = (<any>window).layer;
        layer.confirm(message, {
            btn: ['确定', '取消'],
            icon: 2,
            btn1: (index, layero) => {
                if (callbackFn) {
                    callbackFn(index, layer);
                }
            },
            btn2: (index, layero) => {
                layer.close(index);
            }
        });
    }

    showProcessLayer() {
        const layer = (<any>window).layer;
        return layer.open({
            type: 3,
            skin: 2,
            icon: 0
        });
    }

    closeProcessLayer(index: any) {
        const layer = (<any>window).layer;
        layer.close(index);
    }

    /**
    * If number, like 1000, then return 1,000
    * If NaN, then return itself
    * @param input input value
    */
    getNumberString(input: any): string {
        if (input === null || input === undefined || input === '' || isNaN(input)) {
            return input;
        }
        const parts = input.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }


    /**
     * Check input whether is positive integer. Yes return true, or false.
     * @param input
     */
    isPositiveInteger(input: any): boolean {
        const regValidInput = /^(([1-9]\d*))$/g;
        return regValidInput.test(input);
    }

    /**
     * If input positive integer or 0, return true, or false.
     * @param input
     */
    isPositiveIntegerOrZero(input: any): boolean {
        const regValidInput = /^(([1-9]\d*)|0)$/g;
        return regValidInput.test(input);
    }

    /**
    * If input positive integer or 0, return true, or false.
    */
    isPositiveIntegerOrZeroWith2Decimal(input: any): boolean {
        const regValidInput = /^((([1-9]\d*)|0)(\.(\d){0,2})?)$/g;
        return regValidInput.test(input);
    }

    getDownloadUrl(relatedUrl: string): string {
        const windowObj = <any>window;
        const { TOMCAT_ADDRESS } = windowObj.DREAM_BASE_CONFIG;
        return TOMCAT_ADDRESS + relatedUrl;
    }

}
