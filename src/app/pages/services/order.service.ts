import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api/order';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  addOrder(orderData: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  destroy(orderId: number): Observable<void> {
    // Menggunakan metode DELETE dan URL endpoint yang benar
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
}
