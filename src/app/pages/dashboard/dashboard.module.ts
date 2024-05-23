import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

import { TabsModule } from '../components/tabs/tabs.module';

import { OrdermodalModule } from '../components/ordermodal/ordermodal.module';

// import { TabsComponent } from '../components/tabs/tabs.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TabsModule,
    OrdermodalModule
    
  ],
  declarations: [
    DashboardPage,
  ]
})
export class DashboardPageModule {}
