// dashboard.page.ts

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdermodalComponent } from '../components/ordermodal/ordermodal.component'; 

import { roomsData } from '../room.data';

import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from '../services/room.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public loaded = false;
  public rooms: any[] = [];
  public user: any;

  // rooms = roomsData;

  constructor(
    private modalController: ModalController,
    private roomService: RoomService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.fetchRooms();
    this.getUserData();

    const dataString = localStorage.getItem('user_data');
    if (dataString) {
      const userData = JSON.parse(dataString);
      this.user = userData;
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  getUserData() {
    const currentUser = this.authService.getCurrentUser();
    // console.log('Current user:', currentUser);
  
    if (currentUser) {
      this.user = currentUser;
      // console.log('User data:', this.user);
    }
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
