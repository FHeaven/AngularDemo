import { IssueMaterialBizService } from './issue-material.biz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueMaterialComponent } from './issue-material.component';
import { ComponentsModule } from 'app/components/components.module';
import {
    GetApplyMaterialIdsApiService,
    OpApplyMaterialApiService,
    GetApplyMaterialsByIdService,
    GetApplierListApiService,
    GetApplierListResolver,
    GetApplyHdListApiService,
    GetApplyLnListApiService,
    SaveIssueMaterialApiService,
    DownloadStoreOutByApplyIdApiService
} from 'app/services';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
    declarations: [
        IssueMaterialComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: IssueMaterialComponent
            }
        ])
    ],
    providers: [
        IssueMaterialBizService,
        GetApplyMaterialIdsApiService,
        GetApplierListApiService,
        GetApplierListResolver,
        OpApplyMaterialApiService,
        GetApplyMaterialsByIdService,
        GetApplyHdListApiService,
        GetApplyLnListApiService,
        SaveIssueMaterialApiService,
        DownloadStoreOutByApplyIdApiService
    ]
})
export class IssueMaterialModule { }
