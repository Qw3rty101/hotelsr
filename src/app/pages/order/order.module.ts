import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';

import { TabsModule } from '../components/tabs/tabs.module';

import { CompleteOrderModule } from '../components/completeorder/completeorder.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    TabsModule,
    CompleteOrderModule
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
