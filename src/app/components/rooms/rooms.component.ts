import { Component } from '@angular/core';
import { RoomService } from '../../shared/room.service';
import { Rooms } from '../../model/rooms.model';
import { RoomBookingDetails } from '../../model/Booking.model';
import { GuestService } from '../../shared/guest.service';
import { Guest } from '../../model/Guest.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  rooms: Rooms | undefined;
  bookedRooms: RoomBookingDetails[] = [];
  unavailableRooms: RoomBookingDetails[] = [];
  selectedDate : Date = new Date();
  user : Guest | undefined;

  constructor(private roomService: RoomService, private guestService: GuestService) {
    this.roomService.rooms$.subscribe(data => {
      this.rooms = data;
    });
    this.roomService.bookingDetails$.subscribe(data => {
      this.bookedRooms = data;
    });
    this.roomService.paidRooms$.subscribe(data => {
      this.unavailableRooms = data;
    });
    this.roomService.selectedDate$.subscribe(data => {
      this.selectedDate = data;
    });
    this.user = this.guestService.signedUser;
  }

  selectRoom(num: number, roomType: string) {
    if (roomType == 'Standard') {
      if (this.checkRooms(num)) {
        this.removeRooms(num);
      } else {
        this.addRooms(num, roomType, 123);
      }
    } else if (roomType == 'Studio') {
      if (this.checkRooms(num)) {
        this.removeRooms(num);
      } else {
        this.addRooms(num, roomType, 147);
      }
    } else {
      if (this.checkRooms(num)) {
        this.removeRooms(num);
      } else {
        this.addRooms(num, roomType, 182);
      }
    }
  }

  checkRooms(room: number) {
    return this.bookedRooms.filter(e => e.roomNumber == room).length > 0;
  }

  checkUnavailableRooms(room : number) {
    return this.unavailableRooms.filter(e => e.roomNumber == room && new Date(e.date).toDateString() == this.selectedDate?.toDateString()).length > 0;
  }

  addRooms(num: number, roomType: string, price: number) {
    if(!this.checkUnavailableRooms(num)) {
      let roomDetails = new RoomBookingDetails(new Date().valueOf(), num, roomType, price, 1, 1, this.user?.id, this.selectedDate);
      this.bookedRooms.push(roomDetails);
      this.roomService.bookingDetails.next(this.bookedRooms);
    }
  }

  removeRooms(num: number) {
    this.bookedRooms = this.bookedRooms.filter(function (obj) {
      return obj.roomNumber !== num;
    });
    this.roomService.bookingDetails.next(this.bookedRooms);
  }
}
