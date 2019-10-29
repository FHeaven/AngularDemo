import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'avLimitTo'
})
export class AvLimitToPipe implements PipeTransform {
    transform(arrInput: any, limitTo: number) {
        if (limitTo === -1) {
            return arrInput;
        }
        return arrInput.slice(arrInput, limitTo);
    }
}
