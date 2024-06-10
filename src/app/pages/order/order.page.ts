import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompleteorderComponent } from '../components/completeorder/completeorder.component';
import { Order } from '../interfaces/order';
import { map, switchMap  } from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { RoomService } from '../services/room.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  bookings: Order[] = [];
  live: Order[] = [];
  expired: Order[] = [];

  constructor(private modalController: ModalController, private orderService: OrderService, private roomService: RoomService) { }

  ngOnInit() {
    this.updateOrders();

  }

  ionViewWillEnter() {
    this.updateOrders();
  }

  updateOrders() {
    this.orderService.getOrders().pipe(
      map((orders: Order[]) => {
        this.bookings = orders.filter(order => order.status_order === 'Booking');
        this.live = orders.filter(order => order.status_order === 'Live');
        this.expired = orders.filter(order => order.status_order === 'Expired');
      })
    ).subscribe();
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

  getRoomName(id_room: number): string {
    switch (id_room) {
      case 1:
        return 'Raffel Room';
      case 2:
        return 'Cupid Room';
      case 3:
        return 'Meeting Room';
      default:
        return 'Unknown Room';
    }
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
