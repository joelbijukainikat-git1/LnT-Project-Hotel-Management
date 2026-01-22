import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookings: any[] = [];

  addBooking(booking: any) {
    this.bookings.push(booking);
  }

  getBookings() {
    return this.bookings;
  }
}

