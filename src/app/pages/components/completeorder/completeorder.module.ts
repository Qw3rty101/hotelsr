import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {CompleteorderComponent} from './completeorder.component';



@NgModule({
  declarations: [CompleteorderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CompleteorderComponent],
})
export class CompleteOrderModule { }
