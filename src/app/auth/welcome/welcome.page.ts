import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  signin() {
    this.router.navigate(['/sign-in']);
  }

  signup() {
    this.router.navigate(['/sign-up']);
  }

}
