import { Injectable } from '@angular/core';
import { ordersData } from '../order.data';

interface Order {
  id: number;
  status: string;
  room: string;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = ordersData;

  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(order: Order) {
    this.orders.push(order);
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  getOrdersByStatus(status: string): Order[] {
    return this.orders.filter(order => order.status === status);
  }
}
