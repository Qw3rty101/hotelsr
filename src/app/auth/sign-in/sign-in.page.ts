// sign-in.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, private loadingCtrl: LoadingController) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_data', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login gagal: ' + (response.message || 'Email atau password salah.'));
        }
      },
      error: (error) => {
        alert('Login gagal: Email atau password salah.');
      }
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });

    loading.present();
  }
  
}
