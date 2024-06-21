import { ModalController, ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roomsData } from '../../room.data';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-completeorder',
  templateUrl: './completeorder.component.html',
  styleUrls: ['./completeorder.component.scss'],
})
export class CompleteorderComponent implements OnInit {
  @Input() order: any = {};
  qrCodeUrl?: string;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private orderService: OrderService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    console.log(this.order.id_order);
    console.log('Order received:', this.order);
    if (this.order && typeof this.order.price_order === 'number') {
      this.order.price_order = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(this.order.price_order);
    } else if (this.order && typeof this.order.price_order === 'string') {
      this.order.price_order = parseInt(
        this.order.price_order.replace(/[^0-9]/g, ''),
        10
      );
      this.order.price_order = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(this.order.price_order);
    } else {
      console.error(
        'this.order or this.order.price_order is not defined or not a number or string'
      );
    }
  }

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position,
    });

    await toast.present();
  }

  cancel(orderId: number) {
    this.orderService.destroy(orderId).subscribe(
      (response) => {
        console.log('Order response:', response);
        this.modalController.dismiss();
        this.presentToast('Booking di cancel!', 'top')
        this.router.navigate(['./order']);
      },
      (error) => {
        console.error('Order error:', error);
        if (error.status === 422) {
          console.error('Validation errors:', error.error);
        }
      }
    );
  }

  pay(orderId: number) {
    console.log(orderId);
    this.orderService.pay(orderId).subscribe(
      (response) => {
        console.log('Order response:', response);
        this.modalController.dismiss();
        this.presentToast('Pembayaran berhasil!', 'top')
        this.router.navigate(['./order']);
      },
      (error) => {
        console.error('Order error:', error);
        if (error.status === 422) {
          console.error('Validation errors:', error.error);
        }
      }
    );
  }

  checkoutNow(orderId: number) {
    console.log(orderId);
    this.orderService.checkoutNow(orderId).subscribe(
      (response) => {
        console.log('Order response:', response);
        this.modalController.dismiss();
        this.presentToast('Kamar di check out!', 'top')
        this.router.navigate(['./order']);
      },
      (error) => {
        console.error('Order error:', error);
        if (error.status === 422) {
          console.error('Validation errors:', error.error);
        }
      }
    );
  }

  delete(orderId: number) {
    console.log(orderId);
    this.orderService.delete(orderId).subscribe(
      (response) => {
        console.log('Order response:', response);
        this.modalController.dismiss();
        this.presentToast('History di hapus!', 'top')
        this.router.navigate(['./order']);
      },
      (error) => {
        console.error('Order error:', error);
        if (error.status === 422) {
          console.error('Validation errors:', error.error);
        }
      }
    );
  }

  dismissModal() {
    this.modalController.dismiss();
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
}
