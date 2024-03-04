import { Component } from '@angular/core';
import { Rooms } from '../../model/rooms.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  form = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
    expiry: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  cardNumber = this.form.get("cardNumber");
  expiry = this.form.get("expiry");
  cvv = this.form.get("cvv");

  rooms: number[] = [];

  constructor() {
    this.rooms.push(1);
  }
}
