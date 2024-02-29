import { Component } from '@angular/core';
import { GuestService } from '../../shared/guest.service';
import { Guest } from '../../model/Guest';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  user: Guest | undefined;

  constructor(private servive: GuestService) {
    this.user = this.servive.user;
  }
}
