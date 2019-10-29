import { AvCeilPipe } from './av-ceil.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AvCeilPipe],
  exports: [AvCeilPipe]
})
export class AvCeilModule { }
