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
  // private apiUrl = 'https://fawazpbf.vyst.my.id/api/login';
  private urlRegis = 'http://127.0.0.1:8000/api/register';
  private urlGoogle = 'https://fawazpbf.vyst.my.id/auth/google';
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
          sessionStorage.setItem('session_id', response.session_id);

          const userData = {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
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

  register(registerData: {name: string, email: string, password: string, role: string}): Observable<any> {
    return this.http.post<any>(this.urlRegis, registerData);
  }

  registerWithGoogle(): void {
    const url = `${this.urlGoogle}?redirect_uri=${encodeURIComponent(window.location.origin)}/auth/google/callback`;
    const newWindow = window.open(url, '_blank');
  
    (newWindow ?? window).focus();
  
    const handleRedirect = (event: WindowEventMap['message']) => {
      if (event.origin !== window.location.origin) {
        return;
      }
  
      if (event.data.type === 'google-auth') {
        if (event.data.access_token) {
          const userData = {
            token: event.data.access_token,
            // Tambahkan properti lain dari data pengguna yang diterima dari backend
          };
          this.currentUserSubject.next(userData);
          localStorage.setItem('token', event.data.access_token);
        }
        newWindow?.close();
      }
      // console.log(event.data.access_token)

    };
  
    window.addEventListener('message', handleRedirect);
  }

  // registerWithGoogle(): Observable<any> {
  //   return this.http.get<any>(this.urlGoogle);
  // }
  
}
