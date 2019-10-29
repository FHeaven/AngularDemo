import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageCardComponent } from './page-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PageCardComponent
    ],
    exports: [
        PageCardComponent
    ]
})
export class PageCardModule { }
