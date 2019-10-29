import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { MenuBarComponent } from './menu-bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule
    ],
    declarations: [
        MenuBarComponent
    ],
    exports: [
        MenuBarComponent
    ]
})
export class MenuBarModule { }
