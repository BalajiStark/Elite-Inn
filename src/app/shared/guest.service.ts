import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from '../model/Guest.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  url = "http://localhost:3000/guests";

  private user = new Subject<Guest>();
  user$ = this.user.asObservable();

  signedUser : Guest | undefined;

  constructor(private httpClient: HttpClient) { }

  SetUser(user: Guest) {
    this.signedUser = user;
    this.user.next(user);
  }

  GetUserWithEmail(email: any) {
    return this.httpClient.get<Guest[]>(this.url + '?email=' + email);
  }

  AddNewUser(guest: Guest) {
    return this.httpClient.post(this.url, guest);
  }

  GetUserWithEmailAndPassword(email: any, password: any) {
    return this.httpClient.get<Guest[]>(this.url + '?email=' + email + '&password=' + password);
  }


}
