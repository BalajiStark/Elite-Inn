import { Component } from '@angular/core';
import { RoomService } from '../../shared/room.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent {

  dates: Date[] = [];
  tDate = new Date();
  selectedDate: Date = new Date();
  bookedRoomsCount: number = 0;

  constructor(private roomService: RoomService) {
    this.roomService.GetRoomNumbers();
    this.roomService.bookingDetails$.subscribe(data => {
      this.bookedRoomsCount = data.bookedRooms.length;
    })
    for (let i = 0; i < 7; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      this.dates.push(today);
    }
  }

  increaseWeek() {
    if (this.bookedRoomsCount == 0) {
      var lastDate = this.dates[6];
      this.dates = [];
      for (let i = 0; i < 7; i++) {
        const today = new Date(lastDate);
        today.setDate(today.getDate() + i + 1);
        this.dates.push(today);
      }
      this.selectedDate = this.dates[0];
    } else {
      window.alert("Remove the booked rooms for a day");
    }
  }

  decreaseWeek() {
    if (this.bookedRoomsCount == 0) {
      if (!this.isToday()) {
        var lastDate = this.dates[0];
        this.dates = [];
        for (let i = 0; i < 7; i++) {
          const today = new Date(lastDate);
          today.setDate(today.getDate() - 7 + i);
          this.dates.push(today);
        }
        this.selectedDate = this.dates[0];
      }
    } else {
      window.alert("Remove the booked rooms for a day");
    }
  }

  selectedDateFunction(date: any) {
    if (this.bookedRoomsCount == 0) {
      this.selectedDate = date;
    } else {
      window.alert("Remove the booked rooms for a day");
    }
  }

  isToday() {
    return this.dates[0].toDateString() == new Date().toDateString();
  }
}
