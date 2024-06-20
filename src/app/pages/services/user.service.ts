import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/user';

  constructor(private http: HttpClient) { }

  getMe(id: number): Observable<User> {
    const apiUrlWithId = environment.apiUrl + `/${id}`;
    return this.http.get<User>(apiUrlWithId);
  }

  getUserByEmail(email: string): Observable<User> {
    const apiUrlWithEmail = environment.apiUrl + `/${email}`;
    return this.http.get<User>(apiUrlWithEmail);
  }
}
