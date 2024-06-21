import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/pages/services/room.service';
import { OrderService } from 'src/app/pages/services/order.service';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/pages/interfaces/order';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  public loaded = false;
  public user: any;
  public rooms: any[] = [];
  public orders: any[] = [];

  isModalOpen = false;
  live: any[] = [];

  constructor(
    private router: Router,
    private roomService: RoomService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.fetchRooms();
    this.getOrder();
    const dataString = localStorage.getItem('user_data');
    if (dataString) {
      const userData = JSON.parse(dataString);
      if (userData.role === 'admin') {
        console.log(userData.role);
        // this.router.navigate(['/room']);
      } else {
        console.log(userData.role);
        localStorage.removeItem('user_data');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
      }
      console.log(userData.role);
    } else {
      console.error('Data pengguna tidak ditemukan di localStorage');
    }
  }

  fetchRooms() {
    this.roomService.getRooms().subscribe(
      (data: any) => {
        this.rooms = data.map((room: any) => ({
          ...room,
          rating: JSON.parse(room.rating),
        }));
        this.loaded = true;
      },
      (error: any) => {
        console.error('Error fetching rooms', error);
      }
    );
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getOrder() {
    this.orderService
      .getAllOrders()
      .pipe(
        map((response: any[]) => {
          const orders = response;
          this.orders = orders; 
          console.log('Orders:', orders);
        })
      )
      .subscribe();
  }

  cancel(orderId: number) {
    this.orderService.destroy(orderId).subscribe(
      (response) => {
        console.log('Order response:', response);
        this.router.navigate(['./room']);
      },
      (error) => {
        console.error('Order error:', error);
        if (error.status === 422) {
          console.error('Validation errors:', error.error);
        }
      }
    );
  }
}
