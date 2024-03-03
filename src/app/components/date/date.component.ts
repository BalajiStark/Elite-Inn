import { Component } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent {

  dates: Date[] = [];
  tDate = new Date();
  selectedDate: Date | undefined;

  constructor() {
    for (let i = 0; i < 7; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      this.dates.push(today);
    }
  }

  increaseWeek() {
    var lastDate = this.dates[6];
    this.dates = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date(lastDate);
      today.setDate(today.getDate() + i + 1);
      this.dates.push(today);
    }
  }

  decreaseWeek() {
    var lastDate = this.dates[0];
    this.dates = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date(lastDate);
      today.setDate(today.getDate() - 7 + i);
      this.dates.push(today);
    }
  }

  selectedDateFunction(date: any) {
    this.selectedDate = date;
  }
}
