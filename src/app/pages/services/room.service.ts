import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://127.0.0.1:8000/api/room';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
