import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['/dashboard']);
  }

  order() {
    this.router.navigate(['/order']);
  }

  account() {
    this.router.navigate(['/account']);
  }
}
