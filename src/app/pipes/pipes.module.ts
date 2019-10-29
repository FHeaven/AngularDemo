import { AvNumberStringPipe } from './av-number-string/av-number-string.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvCeilPipe, AvCeilModule, AvLimitPipeModule, AvLimitToPipe } from 'app/pipes';
import { AvNumberStringModule } from './av-number-string';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AvCeilModule,
        AvLimitPipeModule,
        AvNumberStringModule
    ],
    providers: [
    ],
    exports: [
        AvCeilPipe,
        AvLimitToPipe,
        AvNumberStringPipe
    ]
})
export class PipesModule { }
