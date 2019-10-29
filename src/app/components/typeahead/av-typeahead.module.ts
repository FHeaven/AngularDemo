import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvTypeaheadComponent } from './av-typeahead.component';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        AvTypeaheadComponent
    ],
    imports: [
        FormsModule,
        PipesModule,
        CommonModule
    ],
    providers: [],
    exports: [
        AvTypeaheadComponent
    ]
})
export class AvTypeaheadModule { }
