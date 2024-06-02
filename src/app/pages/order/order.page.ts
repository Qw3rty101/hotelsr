import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from '../services/order.service'; // Import the service
import { CompleteorderComponent } from '../components/completeorder/completeorder.component';

interface Order {
  id: number;
  status: string;
  room: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  bookings: Order[] = [];
  live: Order[] = [];
  expired: Order[] = [];

  constructor(private modalController: ModalController, private orderService: OrderService) { }

  ngOnInit() {
    this.updateOrders();
  }

  ionViewWillEnter() {
    this.updateOrders();
  }

  updateOrders() {
    const orders = this.orderService.getOrders();
    this.bookings = orders.filter(order => order.status === 'Booking');
    this.live = orders.filter(order => order.status === 'Live');
    this.expired = orders.filter(order => order.status === 'Expired');
  }

  async openModal(order: Order) {
    const modal = await this.modalController.create({
      component: CompleteorderComponent,
      componentProps: { order: order }
    });

    modal.onDidDismiss().then(() => {
      this.updateOrders();
    });

    return await modal.present();
  }

  getChipColor(type: string): string {
    switch(type) {
      case 'Booking':
        return 'warning';
      case 'Live':
        return 'success';
      case 'Expired':
        return 'danger';
      default:
        return 'primary';
    }
  }
}
