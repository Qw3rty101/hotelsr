import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private apiUrl = 'http://127.0.0.1:8000/api/order';
  httpHeaders: HttpHeaders = new HttpHeaders({
    'x-api-key': environment.apiKey,
  });
  // private apiUrl = 'https://fawazpbf.vyst.my.id/api/order';

  constructor(private http: HttpClient) { }

  getOrders(userId: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `/api/order/${userId}`,
      {headers: this.httpHeaders}
    );
  }

  addOrder(orderData: Order): Observable<Order> {
    return this.http.post<Order>(
      environment.apiUrl + "/api/order", orderData,
      {headers: this.httpHeaders}
    );
  }

  checkOrder(orderId: number): Observable<Order> {
    return this.http.post<Order>(
      environment.apiUrl + `/api/order/checkStatus/${orderId}`,
      {},
      {headers: this.httpHeaders}
    );
  }  

  destroy(orderId: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + `/api/order/${orderId}`,
      {headers: this.httpHeaders}
    );
  }
}
