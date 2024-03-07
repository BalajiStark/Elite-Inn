import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomBookingDetails } from '../../model/Booking.model';
import { RoomService } from '../../shared/room.service';
import { PaymentValidator } from '../../shared/Payment.validator';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  form = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
    expiry: new FormControl('', [Validators.required, PaymentValidator.shouldValidExpiry]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  cardNumber = this.form.get("cardNumber");
  expiry = this.form.get("expiry");
  cvv = this.form.get("cvv");

  rooms: number[] = [];
  bookedRooms: RoomBookingDetails[] = [];
  total: number = 0;

  constructor(private roomService: RoomService) {
    this.roomService.bookingDetails$.subscribe(data => {
      this.bookedRooms = data;
      this.checkTotal();
    })
  }

  removeRooms(room: RoomBookingDetails) {
    let filtered = this.bookedRooms.filter(function (obj) {
      return obj.roomNumber !== room.roomNumber;
    });
    this.roomService.bookingDetails.next(filtered);
  }

  adultsCountChanged(event: any, room: RoomBookingDetails) {
    event.target.value == 1 ? room.price -= 50 : room.price += 50;
    room.adultsCount = Number(event.target.value);
    this.checkTotal();
  }

  childCountChanged(event: any, room: RoomBookingDetails) {
    event.target.value == 1 ? room.price -= 25 : room.price += 25;
    room.adultsCount = Number(event.target.value);
    this.checkTotal();
  }

  checkTotal() {
    this.total = 0;
    this.bookedRooms.forEach(data => {
      this.total += data.price;
    })
  }

  paymentForBooking() {
    if (!this.cardNumber?.valid) {
      this.cardNumber?.markAsTouched();
    }
    if (!this.cvv?.valid) {
      this.cvv?.markAsTouched();
    }
    if (!this.expiry?.valid) {
      this.expiry?.markAsTouched();
    }

    if (this.cardNumber?.valid && this.cvv?.valid && this.expiry?.valid) {

      for(let i = 0; i < this.bookedRooms.length; i++) {
        this.roomService.BookRooms(this.bookedRooms[i]).subscribe(data => {
          if(i == this.bookedRooms.length -1) {
            window.alert("Booked Successfully");
            this.bookedRooms = [];
            this.roomService.bookingDetails.next(this.bookedRooms);
            this.roomService.GetBookedRooms();
            this.form.reset();
          }
        });
      }
    }
  }
}
