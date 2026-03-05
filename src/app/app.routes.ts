import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RoomsComponent } from './rooms.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelDetail } from './components/hotel-detail/hotel-detail';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'hotels', component: HotelListComponent },
  {
    path: 'hotel/:id',
    component: HotelDetail,
    children: [
      { path: 'standard', component: HotelDetail },
      { path: 'deluxe', component: HotelDetail },
      { path: 'suite', component: HotelDetail },
    ]
  },
  { path: 'book', component: BookingFormComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPanel, canActivate: [AdminGuard] },
];
