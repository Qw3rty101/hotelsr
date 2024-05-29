import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from '../services/order.service'; // Import the service
import { CompleteorderComponent } from '../components/completeorder/completeorder.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  bookings: any[] = [];
  live: any[] = [];
  expired: any[] = [];

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

  async openModal() {
    const modal = await this.modalController.create({
      component: CompleteorderComponent
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
