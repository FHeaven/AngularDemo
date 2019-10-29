import { DownloadMonthlyReportBizService } from './download-monthly-report.biz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DownloadMonthlyReportComponent } from './download-monthly-report.component';
import { ComponentsModule } from 'app/components/components.module';
import { PipesModule } from 'app/pipes/pipes.module';
import {
    DownloadStoreInMonthlyApiService,
    DownloadStoreOutInMonthlyApiService,
    DownloadStoreOutMonthlyApiService
} from 'app/services';

@NgModule({
    declarations: [
        DownloadMonthlyReportComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: DownloadMonthlyReportComponent
            }
        ])
    ],
    providers: [
        DownloadMonthlyReportBizService,
        DownloadStoreOutInMonthlyApiService,
        DownloadStoreInMonthlyApiService,
        DownloadStoreOutMonthlyApiService
    ]
})
export class DownloadMonthlyReportModule { }
