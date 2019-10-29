import { RespositoryManageBizService } from './respository-manage.biz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RespositoryManageComponent } from './respository-manage.component';
import { ComponentsModule } from 'app/components/components.module';
import {
    GetMaterialsApiService,
    GetStoreInsResolver,
    GetStoreInsApiService,
    OpStoreInApiService,
    GetMaterialsResolver,
    DownloadStoreInByApplyIdApiService
} from 'app/services';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        RespositoryManageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: RespositoryManageComponent,
                resolve: {
                    lstMaterial: GetMaterialsResolver,
                    lstStoreIn: GetStoreInsResolver
                }
            }
        ])
    ],
    providers: [
        RespositoryManageBizService,
        GetMaterialsApiService,
        GetStoreInsApiService,
        GetMaterialsResolver,
        GetStoreInsResolver,
        OpStoreInApiService,
        DownloadStoreInByApplyIdApiService
    ]
})
export class RespositoryManageModule { }
