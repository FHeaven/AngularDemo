import { AvTypeaheadModule } from './typeahead/av-typeahead.module';
import { AvTypeaheadComponent } from './typeahead/av-typeahead.component';
import { NgModule } from '@angular/core';
import { ScoreStarComponent, ScoreStarModule, AvPaginationModule, AvPaginationComponent } from 'app/components';

@NgModule({
    imports: [
        ScoreStarModule,
        AvTypeaheadModule,
        AvPaginationModule
    ],
    exports: [
        ScoreStarComponent,
        AvTypeaheadComponent,
        AvPaginationComponent
    ]
})
export class ComponentsModule { }

