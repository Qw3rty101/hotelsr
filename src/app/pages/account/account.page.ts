import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public user: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getUserData()

    const dataString = localStorage.getItem('user_data');
    if (dataString) {
      const userData = JSON.parse(dataString);
      if (userData.role === 'user') {
        console.log(userData.role);
        // this.router.navigate(['/room']);
      } else {
        console.log(userData.role);
        this.logout()
      }
      console.log(userData.role);
    } else {
      console.error('Data pengguna tidak ditemukan di localStorage');
    }
  }

  getUserData() {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.user = currentUser;
      console.log('User data:', this.user);
      console.log('Current user role:', currentUser.role);
    } else {
      console.log('No current user data found');
    }
  }

  logout() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
