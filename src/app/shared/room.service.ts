import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rooms } from '../model/rooms.model';
import { Subject } from 'rxjs';
import { BookingDetails } from '../model/Booking.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url = "http://localhost:3000/";

  rooms = new Subject<Rooms>();
  rooms$ = this.rooms.asObservable();

  bookingDetails = new Subject<BookingDetails>();
  bookingDetails$ = this.bookingDetails.asObservable();

  constructor(private httpClient: HttpClient) { }

  GetRoomNumbers() {
    this.httpClient.get<Rooms>(this.url + 'rooms').subscribe(data => {
      this.rooms.next(data);
    });
  }

  BookRooms(bookingDetails : BookingDetails) {
    //if(this.httpClient.get<BookingDetails>(this.url + 'bookingDetails'))
    return this.httpClient.post(this.url + 'bookingDetails', bookingDetails);
  }
}
