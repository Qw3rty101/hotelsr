// auth.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { HttpHeaders } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://127.0.0.1:8000/api/login';
  // private apiUrl = 'https://fawazpbf.vyst.my.id/api/login';
  private urlRegis = 'https://fawazpbf.vyst.my.id/api/register';
  private urlGoogle = 'https://fawazpbf.vyst.my.id/auth/google';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  httpHeaders: HttpHeaders = new HttpHeaders({
    'x-api-key': environment.apiKey,
  });

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getCurrentUser(): any {
    const dataUser = localStorage.getItem('user_data');
    return dataUser ? JSON.parse(dataUser) : null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        environment.apiUrl + '/api/login',
        { email, password },
        { headers: this.httpHeaders }
      )
      .pipe(
        map((response) => {
          if (response.access_token && response.session_id) {
            sessionStorage.setItem('session_id', response.session_id);

            const userData = {
              id: response.user.id,
              email: response.user.email,
              name: response.user.name,
              role: response.user.role,
              token: response.access_token,
            };
            this.currentUserSubject.next(userData);

            return userData;
          } else {
            throw new Error('Login failed');
          }
        }),
        tap((user) => {
          localStorage.setItem('token', user.token);
        })
      );
  }

  register(registerData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + '/api/register',
      registerData,
      { headers: this.httpHeaders }
    );
  }

  registerWithGoogle(UserData: {
    name: string;
    email: string;
  }): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + '/api/loginGoogle',
      UserData,
      {
        headers: this.httpHeaders,
      }
    );
  }

  // registerWithGoogle(): Observable<any> {
  //   return this.http.get<any>(this.urlGoogle);
  // }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
