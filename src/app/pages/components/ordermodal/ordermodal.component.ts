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
  minDate: string = new Date().toISOString();

  checkInDate: string = '';
  checkOutDate: string = '';
  checkInTime: string = '';
  checkOutTime: string = '';
  

  constructor(private modalController: ModalController, private router: Router, private orderService: OrderService) {
    this.minDate = new Date().toISOString();
  }

  ngOnInit() {
    this.updateMinDateTime();
  }

  updateMinDateTime() {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    this.minDate = tomorrow.toISOString();
  }

  order() {
    
    console.log('Check-In Date:', this.checkInDate); // Debugging log
    console.log('Check-In Time:', this.checkInTime); // Debugging log

    const newOrder = {
      id: this.orderService.getOrders().length + 1,
      status: 'Booking',
      room: this.room.name,
      date: this.checkInDate ? new Date(this.checkInDate).toLocaleDateString() : '',
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
  }

  handleCheckInTimeChange(event: any) {
    this.checkInTime = event.detail.value || '';
    console.log('Selected Check-In Time:', this.checkInTime);
  }

  handleCheckOutTimeChange(event: any) {
    this.checkOutTime = event.detail.value || '';
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
