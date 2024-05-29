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

//     fetch("https://jsonplaceholder.typicode.com/posts", { 
      
//     // Adding method type 
//     method: "POST", 
      
//     // Adding body or contents to send 
//     body: JSON.stringify({ 
//         email: "user@mail.com", 
//         password: "user", 
//     }), 
      
//     // Adding headers to the request 
//     headers: { 
//         "Content-type": "application/json; charset=UTF-8",
//     } 
// }) 
  
// // Converting to JSON 
// .then(response => response.json()) 
  
// // Displaying results to console 
// .then(json => {
//   const token = json.token;

//   localStorage.setItem('token',token);
//   this.router.navigate(['/dashboard']);
// }); 

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

    if (this.email === 'user@gmail.com' && this.password === 'user') {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else if(this.email === 'admin@employe.com' && this.password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/room']);
    } else {
      console.error('Email atau password salah!');
    }
  }
}
