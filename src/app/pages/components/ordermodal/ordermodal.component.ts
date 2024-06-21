import { Component, Input, OnInit } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ordermodal',
  templateUrl: './ordermodal.component.html',
  styleUrls: ['./ordermodal.component.scss'],
})
export class OrdermodalComponent implements OnInit {
  @Input() room: any;

  minTime: string;
  minDate: string = new Date().toISOString();
  maxDate: string = new Date().toISOString();

  checkInDate: string = '';
  checkOutDate: string = '';
  checkInTime: string = '';
  checkOutTime: string = '';
  id: any;

  constructor(
    private modalController: ModalController, 
    private router: Router, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private userService: UserService,
    private toastController: ToastController
  ) {

    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 2);

    this.minTime = today.toISOString();
    this.checkInTime = today.toISOString();
    this.checkInDate = today.toISOString().substring(0, 10);
    this.checkOutDate = tomorrow.toISOString().substring(0, 10);
  }

  ngOnInit() {
    console.log(this.room.id_room)
    const dataString = localStorage.getItem('user_data');
    if (dataString) {
      const userData = JSON.parse(dataString);
      this.id = userData.id;
      console.log(this.id);
    } else {
      this.router.navigate(['/sign-in']);
      return;
    }
    
    if (this.room && typeof this.room.price === 'number') {
      this.room.price = new Intl.NumberFormat("id", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0
        }).format(this.room.price);
    } else {
      console.error('this.room or this.room.price is not defined or not a number');
    }
    this.updateMinDateTime();
  }

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position,
    });

    await toast.present();
  }

  updateMinDateTime() {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate());
    this.minDate = tomorrow.toISOString();
  }

  order() {
    let currentUser = this.authService.getCurrentUser();
    currentUser = currentUser ? currentUser['id'] : null;

    if (!this.id) {
      console.error('User ID is not defined.');
      return;
    }

    if (!this.room || !this.room.id_room || typeof this.room.price !== 'string') {
      console.error('Room details or price are not defined or not correctly formatted.');
      return;
    }

    const newOrder: Order = {
      id: this.id,
      id_room: this.room.id_room,
      id_facility: 1,
      price_order: parseInt(this.room.price.replace(/[^0-9]/g, ''), 10),
      check_in: this.checkInDate,
      check_out: this.checkOutDate,
      order_time: this.checkInTime.substring(11, 19),
      status_order: 'Booking',
      room: this.room
    };

    this.orderService.addOrder(newOrder).subscribe(response => {
      console.log('Order response:', response);
      this.modalController.dismiss();
      this.presentToast('Berhasil di booking!', 'top')
      this.router.navigate(['./order']);
    }, error => {
      console.error('Order error:', error);
      if (error.status === 422) {
        console.error('Validation errors:', error.error);
      }
      this.presentToast(error.error.error, 'top')
    });
  }

  handleCheckInDateChange(event: any) {
    this.checkInDate = event.detail.value || '';
    console.log('Selected Check-In Date:', this.checkInDate);
  }

  handleCheckOutDateChange(event: any) {
    this.checkOutDate = event.detail.value || '';
    console.log('Selected Check-Out Date:', this.checkOutDate);
  }

  handleCheckInTimeChange(event: any) {
    this.checkInTime = event.detail.value || '';
    console.log('Selected Check-In Time:', this.checkInTime);
  }

  handleCheckOutTimeChange(event: any) {
    this.checkOutTime = event.detail.value || '';
    console.log('Selected Check-Out Time:', this.checkInTime);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
