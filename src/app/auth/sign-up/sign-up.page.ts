import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position,
    });

    await toast.present();
  }

  async register() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 4000,
    });
  
    await loading.present();
  
    const registerData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'user'
    };
  
    this.authService.register(registerData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response) {
          this.presentToast('Account created successfully! directed to log in... ', 'top');
          this.router.navigate(['/sign-in']);
        } else {
          this.errorMessage = 'Please check your input again!';
          this.presentToast(this.errorMessage, 'top');
        }
      },
      error: async (error) => {
        await loading.dismiss();
  
        if (error.error && error.error.email && Array.isArray(error.error.email) && error.error.email[0]) {
          this.errorMessage = error.error.email[0];
        } else {
          this.errorMessage = 'Please check your input again!';
        }
  
        this.presentToast(this.errorMessage ?? 'Error tidak diketahui', 'top');
      }
    });
  }
  
  async google() {
    this.authService.registerWithGoogle();
  }

}
