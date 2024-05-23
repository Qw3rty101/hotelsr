import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordermodal',
  templateUrl: './ordermodal.component.html',
  styleUrls: ['./ordermodal.component.scss'],
})
export class OrdermodalComponent implements OnInit {

  @Input() room: any;
  minDate: string = new Date().toISOString();
  

  constructor(private modalController: ModalController, private router: Router) {
    this.minDate = new Date().toISOString();
  }

  ngOnInit() {
    this.updateMinDateTime();
  }

  updateMinDateTime() {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    this.minDate = tomorrow.toISOString();
  }

  order() {
    this.modalController.dismiss();
    this.router.navigate(['./order']);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
