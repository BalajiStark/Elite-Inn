import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rooms } from '../model/rooms.model';
import { Subject } from 'rxjs';
import { RoomBookingDetails } from '../model/Booking.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url = "http://localhost:3000/";

  rooms = new Subject<Rooms>();
  rooms$ = this.rooms.asObservable();

  bookingDetails = new Subject<RoomBookingDetails[]>();
  bookingDetails$ = this.bookingDetails.asObservable();

  paidRooms = new Subject<RoomBookingDetails[]>();
  paidRooms$ = this.paidRooms.asObservable();

  constructor(private httpClient: HttpClient) {
    this.GetBookedRooms()
  }

  GetRoomNumbers() {
    this.httpClient.get<Rooms>(this.url + 'rooms').subscribe(data => {
      this.rooms.next(data);
    });
  }

  GetBookedRooms() {
    this.httpClient.get<RoomBookingDetails[]>(this.url + 'bookingDetails').subscribe(data => {
      this.paidRooms.next(data);
    });
  }

  BookRooms(bookingDetails : RoomBookingDetails) {
    return this.httpClient.post(this.url + 'bookingDetails', bookingDetails);
  }
}
