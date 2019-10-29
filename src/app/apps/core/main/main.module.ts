import { MenuBarModule } from './components/menu-bar/menu-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ComponentsModule } from 'app/components/components.module';
import { MainBizService } from './main.biz.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MainRoutingModule,
        ComponentsModule,
        MenuBarModule
    ],
    declarations: [
        MainComponent
    ],
    providers: [MainBizService]
})
export class MainModule { }
