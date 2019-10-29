import { AvLimitToPipe } from './av-limit-to.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AvLimitToPipe],
  exports: [AvLimitToPipe]
})
export class AvLimitPipeModule { }
