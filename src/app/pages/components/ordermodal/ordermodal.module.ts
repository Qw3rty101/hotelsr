import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {OrdermodalComponent} from './ordermodal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [OrdermodalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [OrdermodalComponent],
})
export class OrdermodalModule { }
