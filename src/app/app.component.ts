import { Component, OnInit } from '@angular/core';
import { isPlatform } from '@ionic/angular';
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth"

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor() {
  }
  
  ngOnInit(): void {
    if(isPlatform("hybrid")){
      this.initializeApp();
    }
  }
  initializeApp() {
    if(isPlatform("capacitor")){
        GoogleAuth.initialize({
          clientId: '122388841545-l5qkuqh82ov7rtbnmuuvj3mtev7a7gr7.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true
        })
    }
  }
}
