import { Injectable } from '@angular/core';
import { ordersData } from '../order.data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = ordersData;

  getOrders() {
    return this.orders;
  }

  addOrder(order: any) {
    this.orders.push(order);
  }
}
