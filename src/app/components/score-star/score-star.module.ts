import { ScoreStarComponent } from './score-star.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ScoreStarComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ScoreStarComponent
    ]
})
export class ScoreStarModule { }
