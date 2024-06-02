import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roomsData } from '../../room.data';
import { OrderService } from '../../services/order.service';  


@Component({
  selector: 'app-completeorder',
  templateUrl: './completeorder.component.html',
  styleUrls: ['./completeorder.component.scss'],
})
export class CompleteorderComponent  implements OnInit {

  @Input() order: any = {};

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('Order received:', this.order);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
