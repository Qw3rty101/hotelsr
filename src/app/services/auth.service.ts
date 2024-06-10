// ../app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../pages/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/login';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (response.access_token) {
          // Simpan informasi pengguna di BehaviorSubject
          const user = {
            email,
            name: response.name, // pastikan API mengirim nama pengguna
            token: response.access_token
          };
          this.currentUserSubject.next(user);
        }
      })
    );
  }
  

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
