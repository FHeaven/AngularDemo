import { PageCardModule } from './page-card/page-card.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PageCardModule,
        RouterModule.forChild([{
            path: '',
            component: HomeComponent
        }])
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
