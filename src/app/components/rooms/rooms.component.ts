import { Component } from '@angular/core';
import { RoomService } from '../../shared/room.service';
import { Rooms } from '../../model/rooms.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  rooms: Rooms | undefined;
  selectedStandardRoom: number[] = [];
  selectedStudioRoom: number[] = [];
  selectedSuiteRoom: number[] = [];

  constructor(private roomService: RoomService) {
    this.roomService.GetRoomNumbers();
    this.roomService.rooms$.subscribe(data => {
      this.rooms = data;
    });
  }

  selectRoom(num: any, roomType: any) {
    if (roomType == 'Standard') {
      const index = this.selectedStandardRoom.indexOf(num);
      if(index > -1) {
        this.selectedStandardRoom.splice(index, 1);
      } else {
        this.selectedStandardRoom.push(num);
      }
    } else if (roomType == 'Studio') {
      const index = this.selectedStudioRoom.indexOf(num);
      if(index > -1) {
        this.selectedStudioRoom.splice(index, 1);
      } else {
        this.selectedStudioRoom.push(num);
      }
    } else {
      const index = this.selectedSuiteRoom.indexOf(num);
      if(index > -1) {
        this.selectedSuiteRoom.splice(index, 1);
      } else {
        this.selectedSuiteRoom.push(num);
      }
    }
  }

  checkRooms(room: number, roomType: any) {
    if (roomType == 'Standard') {
      return this.selectedStandardRoom.includes(room);
    } else if (roomType == 'Studio') {
      return this.selectedStudioRoom.includes(room);
    } else {
      return this.selectedSuiteRoom.includes(room);
    }
  }
}
