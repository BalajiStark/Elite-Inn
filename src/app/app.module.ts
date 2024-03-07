import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccommodationComponent } from './components/accommodation/accommodation.component';
import { BookComponent } from './components/book/book.component';
import { DateComponent } from './components/date/date.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MybookingsComponent } from './components/mybookings/mybookings.component';
import { DateFormatter } from './shared/dateformatter.pipe';
import { GuestService } from './shared/guest.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AccommodationComponent,
    BookComponent,
    DateComponent,
    RoomsComponent,
    PaymentComponent,
    MybookingsComponent,
    DateFormatter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'accommodation', component: AccommodationComponent },
      { path: 'book', component: BookComponent, canActivate: [GuestService] },
      { path: 'mybookings', component: MybookingsComponent, canActivate: [GuestService]  }
    ])
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
