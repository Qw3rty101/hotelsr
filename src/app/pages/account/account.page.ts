import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public user: any;

  constructor(private router: Router) { }

  ngOnInit() {

    const dataString = localStorage.getItem('user_data');
    if (dataString) {
      const userData = JSON.parse(dataString);
      this.user = userData;
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  logout() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

}
