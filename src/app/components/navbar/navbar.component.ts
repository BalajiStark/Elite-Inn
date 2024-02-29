import { Component } from '@angular/core';
import { GuestService } from '../../shared/guest.service';
import { Guest } from '../../model/Guest.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: Guest | undefined;
  isSignedIn = false;

  constructor(private servive: GuestService) {
    this.servive.user$.subscribe(data => {
      this.user = data;
      this.isSignedIn = data != null;
    });
  }
}
