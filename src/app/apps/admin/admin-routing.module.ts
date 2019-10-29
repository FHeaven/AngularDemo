import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminRouting } from './admin-routing';

@NgModule({
    imports: [
        RouterModule.forChild([
            ...AdminRouting
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
