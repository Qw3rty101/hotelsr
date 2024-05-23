// dashboard.page.ts

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdermodalComponent } from '../components/ordermodal/ordermodal.component'; 

import { roomsData } from '../room.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  rooms = roomsData;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  
  async openModal(roomData: any) {
    const modal = await this.modalController.create({
      component: OrdermodalComponent,
      componentProps: {
        room: roomData
      }
    });
    await modal.present();
  }
}
