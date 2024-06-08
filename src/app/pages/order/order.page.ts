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
    // this.orderService.getOrders().pipe(
    //   switchMap((orders: Order[]) => {
    //     const roomRequests: Observable<Order>[] = orders.map(order =>
    //       this.roomService.getRoomById(order.id_room).pipe(
    //         map(room => ({ ...order, roomName: room.name_room }))
    //       )
    //     );
    //     return forkJoin(roomRequests);
    //   })
    // ).subscribe((ordersWithRoomNames: Order[]) => {
    //   this.bookings = ordersWithRoomNames.filter(order => order.status_order === 'Booking');
    //   this.live = ordersWithRoomNames.filter(order => order.status_order === 'Live');
    //   this.expired = ordersWithRoomNames.filter(order => order.status_order === 'Expired');
    // });
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
