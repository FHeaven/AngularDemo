import { ApplyMaterialBizService } from './apply-material.biz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplyMaterialComponent } from './apply-material.component';
import { ComponentsModule } from 'app/components/components.module';
import {
    GetMaterialsApiService,
    GetMaterialsResolver,
    GetApplyMaterialIdsApiService,
    OpApplyMaterialApiService,
    GetApplyMaterialsByIdService,
    GetApplierListApiService,
    GetApplierListResolver,
    DownloadStoreOutByApplyIdApiService
} from 'app/services';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
    declarations: [
        ApplyMaterialComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: ApplyMaterialComponent,
                data: {
                    isCompleted: 'N'
                },
                resolve: {
                    lstMaterial: GetMaterialsResolver,
                    lstApplier: GetApplierListResolver
                }
            }
        ])
    ],
    providers: [
        ApplyMaterialBizService,
        GetMaterialsApiService,
        GetMaterialsResolver,
        GetApplyMaterialIdsApiService,
        GetApplierListApiService,
        GetApplierListResolver,
        OpApplyMaterialApiService,
        GetApplyMaterialsByIdService,
        DownloadStoreOutByApplyIdApiService
    ]
})
export class ApplyMaterialModule { }
