import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const dataString = localStorage.getItem('user_data');
    if (dataString) {
      const userData = JSON.parse(dataString);
      if(userData.role === 'admin') {
        this.router.navigate(['/room']);
  
      } else {
        this.router.navigate(['/dashboard']);
      }
      console.log(userData.role);
    } else {
      console.error('Data pengguna tidak ditemukan di localStorage');
    }
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position,
    });

    await toast.present();
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
  
    await loading.present();
  
    this.authService.login(this.email, this.password)
      .subscribe({
        next: async (response) => {
          await loading.dismiss();
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user_data', JSON.stringify(response));
            this.presentToast('Selamat Datang', 'top');
            
            console.log(response.role);
            if (response.role === 'admin') {
              this.router.navigate(['/room']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          } else {
            this.errorMessage = response.message || 'Email atau password salah!';
            this.presentToast(this.errorMessage ?? 'Error tidak diketahui', 'top');
          }
        },
        error: async (error) => {
          await loading.dismiss();
          
          if (error.status === 429) {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Email atau password salah!';
          }
          this.presentToast(this.errorMessage ?? 'Error tidak diketahui', 'top');
        }
      });
  }
  

  async google() {
    this.authService.registerWithGoogle();
  }
}
