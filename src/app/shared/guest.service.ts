import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from '../model/Guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  url = "http://localhost:3000/guests";
  user: Guest | undefined;

  constructor(private httpClient: HttpClient) { }

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
