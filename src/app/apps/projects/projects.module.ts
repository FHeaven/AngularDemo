import { NgModule } from '@angular/core';
import { ProjectsRoutingModule } from './projects-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProjectsRoutingModule,
        ComponentsModule
    ]
})
export class ProjectsModule {

}
