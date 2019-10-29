import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GetLoginDataResolver } from 'app/services/api/core/get-login-data.resolver';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dream/login',
        pathMatch: 'full'
    },
    {
        path: 'dream/login',
        loadChildren: './../app/apps/core/login/login.module#LoginModule'
    },
    {
        path: 'dream',
        loadChildren: './../app/apps/core/main/main.module#MainModule',
        resolve: {
            loginData: GetLoginDataResolver,
        }
    },
    {
        path: '**',
        redirectTo: 'dream/login',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
