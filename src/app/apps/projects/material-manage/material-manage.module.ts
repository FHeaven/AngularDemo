import { MaterialManageBizService } from './material-manage.biz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialManageComponent } from './material-manage.component';
import { ComponentsModule } from 'app/components/components.module';
import { OpMaterialApiService, GetMaterialsApiService } from 'app/services';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
    declarations: [
        MaterialManageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: MaterialManageComponent
            }
        ])
    ],
    providers: [
        GetMaterialsApiService,
        OpMaterialApiService,
        MaterialManageBizService,
    ]
})
export class MaterialManageModule { }
