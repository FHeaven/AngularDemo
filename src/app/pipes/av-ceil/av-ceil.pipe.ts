import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'avCeil'
})
export class AvCeilPipe implements PipeTransform {
    transform(input: number) {
        return Math.ceil(input);
    }
}
