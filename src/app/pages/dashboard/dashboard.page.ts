// dashboard.page.ts

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdermodalComponent } from '../components/ordermodal/ordermodal.component'; 

import { roomsData } from '../room.data';

import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public loaded = false;
  public rooms: any[] = [];

  // rooms = roomsData;

  constructor(private modalController: ModalController, private roomService: RoomService) { }

  ngOnInit() {
    this.fetchRooms();
  }
  
  fetchRooms() {
    this.roomService.getRooms().subscribe((data: any) => {
      this.rooms = data.map((room: any) => ({
        ...room,
        rating: JSON.parse(room.rating)
      }));
      this.loaded = true;
    }, (error: any) => {
      console.error('Error fetching rooms', error);
    });
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
