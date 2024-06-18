import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompleteorderComponent } from '../components/completeorder/completeorder.component';
import { Order } from '../interfaces/order';
import { map } from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { RoomService } from '../services/room.service';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  public user: any;
  bookings: Order[] = [];
  live: Order[] = [];
  expired: Order[] = [];

  constructor(
    private modalController: ModalController, 
    private orderService: OrderService, 
    private roomService: RoomService, 
    private userService: UserService, 
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
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
    console.log('Current user:', currentUser);

    if (currentUser) {
      this.user = currentUser;
      // console.log('User data:', this.user);
      // console.log('User id:', this.user.id);
      this.updateOrders();
    }
  }

  ionViewWillEnter() {
    if (this.user) {
      this.updateOrders();
    }
  }

  updateOrders() {
    if (!this.user || !this.user.id) {
      console.error('User ID is undefined');
      return;
    }
  
    this.orderService.getOrders(this.user.id).pipe(
      map((response: { orders: Order[] }) => {
        const orders = response.orders;
        this.bookings = orders.filter(order => order.status_order === 'Booking');
        this.live = orders.filter(order => order.status_order === 'Live');
        this.expired = orders.filter(order => order.status_order === 'Expired');
  
        this.live.forEach((liveOrder: any) => {
          if (Array.isArray(liveOrder.id_order)) {
            liveOrder.id_order.forEach((orderId: any) => {
              if (typeof orderId === 'object' && orderId.hasOwnProperty('id_order')) {
                this.orderService.checkOrder(orderId.id_order).subscribe((response) => {
                  console.log(liveOrder.id_order);
                });
              }
            });
          } else {
            this.orderService.checkOrder(liveOrder.id_order).subscribe((response) => {
              console.log(liveOrder.id_order);
            });
          }
        });
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
        return 'Laffrel Room';
      case 3:
        return 'Cupid Room';
      case 4:
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
