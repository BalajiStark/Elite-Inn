import { Component } from '@angular/core';
import { GuestService } from '../../shared/guest.service';
import { Guest } from '../../model/Guest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: Guest | undefined;
  isSignedIn = false;

  constructor(private service: GuestService, private router: Router) {
    this.service.user$.subscribe(data => {
      this.user = data;
      this.isSignedIn = data != null;
    });
  }

  redirectPage(page : string) {
    this.router.navigate(['/' + page]);
  }
}
