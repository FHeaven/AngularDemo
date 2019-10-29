import { PipesModule } from '../../pipes/pipes.module';
import { AvPaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AvPaginationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipesModule
    ],
    providers: [
    ],
    exports: [
        AvPaginationComponent
    ]
})
export class AvPaginationModule { }
