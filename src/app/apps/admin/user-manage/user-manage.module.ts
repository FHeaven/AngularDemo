import { UserManageBizService } from './user-manage.biz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserManageComponent } from './user-manage.component';
import { ComponentsModule } from 'app/components/components.module';
import { SaveUserApiService, GetUsersApiService } from 'app/services';

@NgModule({
    declarations: [
        UserManageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: UserManageComponent
            }
        ])
    ],
    providers: [
        GetUsersApiService,
        SaveUserApiService,
        UserManageBizService,
    ]
})
export class UserManageModule { }
