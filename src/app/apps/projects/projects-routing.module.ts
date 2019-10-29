import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectRouting } from './project-routing';

@NgModule({
    imports: [
        RouterModule.forChild([
            ...ProjectRouting
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ProjectsRoutingModule { }
