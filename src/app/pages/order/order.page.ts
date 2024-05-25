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
  checkIns: any[] = [];
  checkOuts: any[] = [];

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
    this.checkIns = orders.filter(order => order.status === 'Check-in');
    this.checkOuts = orders.filter(order => order.status === 'Check-out');
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
      case 'Check-in':
        return 'success';
      case 'Check-out':
        return 'danger';
      default:
        return 'primary';
    }
  }
}
