import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {OrdermodalComponent} from './ordermodal.component';



@NgModule({
  declarations: [OrdermodalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [OrdermodalComponent],
})
export class OrdermodalModule { }
