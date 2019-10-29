import { AvNumberStringPipe } from './av-number-string.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AvNumberStringPipe],
  exports: [AvNumberStringPipe]
})
export class AvNumberStringModule { }
