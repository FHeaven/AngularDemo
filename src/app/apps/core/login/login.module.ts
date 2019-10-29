import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ParticlesModule } from 'angular-particle';
import { FormsModule } from '@angular/forms';
import { LoginApiService } from 'app/services/api';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '',
            component: LoginComponent
        }]),
        ParticlesModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        LoginApiService
    ]
})
export class LoginModule {

}
