import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';

const routing = [
    {
        path: 'home',
        component: MainComponent,
        loadChildren: './../home/home.module#HomeModule'
    },
    {
        path: 'projects',
        component: MainComponent,
        loadChildren: './../../projects/projects.module#ProjectsModule'
    },
    {
        path: 'admin',
        component: MainComponent,
        loadChildren: './../../admin/admin.module#AdminModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routing)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
