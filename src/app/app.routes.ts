import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RoomsComponent } from './rooms.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'hotels', component: HotelListComponent },
  { path: 'book', component: BookingFormComponent },
  { path: 'dashboard', component: UserDashboardComponent },
];
