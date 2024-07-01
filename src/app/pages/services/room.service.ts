import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  // private apiUrl = 'http://127.0.0.1:8000/api/room';
  // private apiUrl = 'https://fawazpbf.vyst.my.id/api/room';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/room", {
      headers:{
        'x-api-key': environment.apiKey
      }
    });
  }

  updateRoomQuantities(rooms: any[]): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/api/room/update-quantities', { rooms }, {
      headers:{
        'x-api-key': environment.apiKey
      }
    });
  }

  // getRoomById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }
}
