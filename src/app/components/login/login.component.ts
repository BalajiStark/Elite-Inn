import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../../model/Guest';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GuestService } from '../../shared/guest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    logInEmail: new FormControl('', [Validators.required, Validators.email,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    logInPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  username = this.form.get("username");
  email = this.form.get("email");
  password = this.form.get("password");
  loginEmail = this.form.get("logInEmail");
  loginPassword = this.form.get("logInPassword");
  signIn = true;
  signIntext = "Existing user? Click here to Log in";

  constructor(private httpClient: HttpClient,
    private router: Router,
    private guestService: GuestService) {
  }

  url = "http://localhost:3000/guests";



  switchLoginSignin() {
    this.signIn = !this.signIn;
    this.signIntext = this.signIn ? "Existing user? Log in here" : "New User? Click here to Sign in";
  }

  isSignIn() {
    return this.signIn;
  }

  signInWithEmail() {
    if (!this.email?.valid) {
      this.email?.markAsTouched();
    }
    if (!this.username?.valid) {
      this.username?.markAsTouched();
    }
    if (!this.password?.valid) {
      this.password?.markAsTouched();
    }

    if (this.email?.valid && this.username?.valid && this.password?.valid) {

      var guest = new Guest(new Date().getTime(), this.username?.value, this.email?.value, this.password?.value);
      this.guestService.GetUserWithEmail(this.email.value).subscribe(data => {
        if (data.length != 0) {
          this.form.setErrors({
            invalidLogin: true
          });
        }
        else {
          this.guestService.AddNewUser(guest).subscribe(data => {
            this.guestService.SetUser(guest);
            this.router.navigate(['/home']);
          });
        }
      });
    }
  }

  logInWithEmail() {
    if (!this.loginEmail?.valid) {
      this.loginEmail?.markAsTouched();
    }
    if (!this.loginPassword?.valid) {
      this.loginPassword?.markAsTouched();
    }

    if (this.loginEmail?.valid && this.loginPassword?.valid) {
      this.guestService.GetUserWithEmailAndPassword(this.loginEmail.value, this.loginPassword.value).subscribe(data => {
        if (data.length == 0) {
          this.form.setErrors({
            invalidLogin: true
          });
        }
        else {
          this.guestService.SetUser(data[0]);
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
