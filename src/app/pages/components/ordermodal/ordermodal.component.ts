import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';  

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

    const currentDateTime = new Date();
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.minTime = currentDateTime.toISOString().substring(0, 10);
    this.checkInDate = today.toISOString().substring(0, 10);
    this.checkOutDate = tomorrow.toISOString().substring(0, 10);
  }

  ngOnInit() {
    this.updateMinDateTime();
  }

  updateMinDateTime() {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate());
    this.minDate = tomorrow.toISOString();
  }

  order() {
    
    console.log('Check-In Date:', this.checkInDate);
    console.log('Check-Out Date:', this.checkOutDate);
    console.log('Check-In Time:', this.checkInTime);
    console.log('Check-Out Time:', this.checkInTime);

    const newOrder = {
      id: this.orderService.getOrders().length,
      status: 'Booking',
      room: this.room.name,
      date: this.checkInDate ? new Date(this.checkInDate).toLocaleDateString() : '',
      dateOut: this.checkOutDate ? new Date(this.checkOutDate).toLocaleDateString() : '',
      time: this.checkInTime ? new Date(this.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
    };
    this.orderService.addOrder(newOrder);
    this.modalController.dismiss();
    this.router.navigate(['./order']);
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
