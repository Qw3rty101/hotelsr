import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [TabsComponent],
  exports: [TabsComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TabsModule {}
