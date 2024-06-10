import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { RoomService } from '../../services/room.service';

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

  constructor(private modalController: ModalController, private router: Router, private orderService: OrderService) {
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 2);

    this.minTime = today.toISOString();
    this.checkInTime = today.toISOString();
    this.checkInDate = today.toISOString().substring(0, 10);
    this.checkOutDate = tomorrow.toISOString().substring(0, 10);
  }

  ngOnInit() {
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

  updateMinDateTime() {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate());
    this.minDate = tomorrow.toISOString();
  }

  order() {
    if (!this.room || typeof this.room.price !== 'string') {
      console.error('this.room or this.room.price is not defined or not a formatted string');
      return;
    }
    const newOrder: Order = {
      id: 1,
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
      this.router.navigate(['./order']);
    }, error => {
      console.error('Order error:', error);
      if (error.status === 422) {
        console.error('Validation errors:', error.error);
      }
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
