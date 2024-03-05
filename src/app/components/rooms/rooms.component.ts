import { Component } from '@angular/core';
import { RoomService } from '../../shared/room.service';
import { Rooms } from '../../model/rooms.model';
import { BookingDetails, RoomDetails } from '../../model/Booking.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  rooms: Rooms | undefined;
  bookingDetails: BookingDetails = new BookingDetails(1, new Date());

  constructor(private roomService: RoomService) {
    this.bookingDetails = new BookingDetails(1, new Date());
    this.roomService.rooms$.subscribe(data => {
      this.rooms = data;
    });
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
    return this.bookingDetails.bookedRooms.filter(e => e.roomNumber == room).length > 0;
  }

  addRooms(num: number, roomType: string, price: number) {
    let roomDetails = new RoomDetails(new Date().valueOf(), num, roomType, price, 1, 1);
    this.bookingDetails?.bookedRooms.push(roomDetails);
    this.roomService.bookingDetails.next(this.bookingDetails);
  }

  removeRooms(num: number) {
    this.bookingDetails.bookedRooms = this.bookingDetails?.bookedRooms.filter(function (obj) {
      return obj.roomNumber !== num;
    });
    this.roomService.bookingDetails.next(this.bookingDetails);
  }
}
