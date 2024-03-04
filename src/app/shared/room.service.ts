import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rooms } from '../model/rooms.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url = "http://localhost:3000/rooms";

  private rooms = new Subject<Rooms>();
  rooms$ = this.rooms.asObservable();

  constructor(private httpClient: HttpClient) { }

  GetRoomNumbers() {
    this.httpClient.get<Rooms>(this.url).subscribe(data => {
      this.rooms.next(data);
    });
  }
}
