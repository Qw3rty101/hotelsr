// session-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class SessionInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const sessionId = sessionStorage.getItem('session_id') || '';
    const clonedRequest = req.clone({
      headers: req.headers.set('X-Session-ID', sessionId)
    });
    return next.handle(clonedRequest);
  }
}
