import { Pipe, PipeTransform } from '@angular/core';
import { FoundationService } from 'app/services';

@Pipe({
    name: 'avNumberString'
})
export class AvNumberStringPipe implements PipeTransform {

    constructor(private foundationSvc: FoundationService) { }

    transform(input: number) {
        return this.foundationSvc.getNumberString(input);
    }
}
