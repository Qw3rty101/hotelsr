import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  async login() {

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          body: JSON.stringify({
              email: this.email,  // Perbaikan nama field
              password: this.password,  // Perbaikan nama field
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          },
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error('Error:', errorText);
          alert('Login gagal: ' + errorText);
          return;
      }

      const json = await response.json();
      console.log(json);

      if (json.access_token) {  // Pengecekan apakah login berhasil
          const token = json.access_token;
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
      } else {
          alert('Login gagal: ' + (json.message || 'Email atau password salah.'));
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Login gagal: Kesalahan jaringan atau server.');
  }

// axios.post('/login', {
//   email: 'user@mail.com',
//   password: 'user'
// })
// .then(function (response) {
//    const token = response.token;
//    localStorage.setItem('token',token);
//    this.router.navigate(['/dashboard']);

// })
// .catch(function (error) {
//   const error = error.msg;
//   alert(error)
// });

  //   if (this.email === 'user@gmail.com' && this.password === 'user') {
  //     console.log('Email:', this.email);
  //     console.log('Password:', this.password);
      
  //     localStorage.setItem('isLoggedIn', 'true');
  //     this.router.navigate(['/dashboard']);
  //   } else if(this.email === 'admin@employe.com' && this.password === 'admin') {
  //     localStorage.setItem('isLoggedIn', 'true');
  //     this.router.navigate(['/room']);
  //   } else {
  //     console.error('Email atau password salah!');
  //   }
  }
}
