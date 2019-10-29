import { PasswordManageBizService } from './password-manage.biz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordManageComponent } from './password-manage.component';
import { ComponentsModule } from 'app/components/components.module';
import { ChangePasswordApiService } from 'app/services';

@NgModule({
    declarations: [
        PasswordManageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: PasswordManageComponent
            }
        ])
    ],
    providers: [
        ChangePasswordApiService,
        PasswordManageBizService,
    ]
})
export class PasswordManageModule { }
