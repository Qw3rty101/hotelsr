// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';

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

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map(response => {
        if (response.access_token && response.session_id) {
          // Simpan session ID
          sessionStorage.setItem('session_id', response.session_id);

          // Simpan informasi pengguna
          const userData = {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            token: response.access_token
          };
          this.currentUserSubject.next(userData);

          return userData;
        } else {
          throw new Error('Login failed');
        }
      }),
      tap(user => {
        localStorage.setItem('token', user.token);
      })
    );
  }
}
