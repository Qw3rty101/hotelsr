
import "@codetrix-studio/capacitor-google-auth";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionInterceptorService } from './services/session-interceptor.service';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [AppComponent, TabComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
