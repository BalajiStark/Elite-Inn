import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  dates: Date[] = [];
  tDate = new Date();

  constructor() {
    for (let i = 0; i < 7; i++) {
      let today = new Date();
      today.setDate(today.getDate() + i);
      this.dates.push(today);
    }
  }

  increaseWeek()
  {
    var lastDate = this.dates[6];
    this.dates = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date(lastDate);
      today.setDate(today.getDate() + i + 1);
      this.dates.push(today);
    }
  }

  decreaseWeek()
  {
    var lastDate = this.dates[0];
    this.dates = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date(lastDate);
      today.setDate(today.getDate() - 7 + i);
      this.dates.push(today);
    }
  }
}
