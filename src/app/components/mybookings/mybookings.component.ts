import { Component } from '@angular/core';
import { GuestService } from '../../shared/guest.service';
import { Guest } from '../../model/Guest.model';
import { RoomService } from '../../shared/room.service';
import { RoomBookingDetails } from '../../model/Booking.model';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent {

  user: Guest | undefined;
  bookedRooms: RoomBookingDetails[] = [];

  constructor(private guestService: GuestService, private roomService: RoomService) {
    this.user = this.guestService.signedUser;
    this.roomService.GetBookedRooms();
    this.roomService.paidRooms$.subscribe(data => {
      this.bookedRooms = data.filter(e => e.userId == this.user?.id);
    });
  }
}
