import { Component } from '@angular/core';
import { Rooms } from '../../model/rooms.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingDetails, RoomDetails } from '../../model/Booking.model';
import { RoomService } from '../../shared/room.service';

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
  bookingDetails : BookingDetails = new BookingDetails(1, new Date());
  selectedRooms : RoomDetails[] = [];
  total : number = 0;

  constructor(private roomService : RoomService) {
    this.roomService.bookingDetails$.subscribe(data=> {
      this.bookingDetails = data;
      this.checkTotal();
    })
  }

  removeRooms(room: RoomDetails) {
    let filtered = this.bookingDetails?.bookedRooms.filter(function( obj ) {
      return obj.roomNumber !== room.roomNumber;
    });
    this.bookingDetails.bookedRooms = filtered;
    this.roomService.bookingDetails.next(this.bookingDetails);
  }

  adultsCountChanged(event : any, room : RoomDetails) {
    event.target.value == 1 ? room.price -= 50 : room.price += 50;
    this.checkTotal();
  }

  childCountChanged(event : any, room : RoomDetails) {
    event.target.value == 1 ? room.price -= 25 : room.price += 25;
    this.checkTotal();
  }

  checkTotal() {
    this.total = 0;
    this.bookingDetails.bookedRooms.forEach(data => {
      this.total += data.price;
    })
  }
}
