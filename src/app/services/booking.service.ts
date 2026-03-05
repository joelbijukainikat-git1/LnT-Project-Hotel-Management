import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Booking {
  id: number;
  userId: number;
  hotelId: number;
  hotelName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [];
  private bookings$ = new BehaviorSubject<Booking[]>(this.bookings);
  private bookingIdCounter = 1;

  constructor() {
    // Initialize with some demo bookings
    this.bookings = [
      {
        id: 1,
        userId: 1,
        hotelId: 1,
        hotelName: 'Grand Palace',
        roomType: 'Deluxe',
        checkInDate: '2026-03-10',
        checkOutDate: '2026-03-15',
        guests: 2,
        totalPrice: 15000,
        bookingDate: '2026-03-05',
        status: 'confirmed'
      }
    ];
    this.bookingIdCounter = 2;
  }

  addBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: this.bookingIdCounter++
    };
    this.bookings.push(newBooking);
    this.bookings$.next(this.bookings);
    return of(newBooking).pipe(delay(500));
  }

  getBookings(): Observable<Booking[]> {
    return of(this.bookings).pipe(delay(300));
  }

  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return of(this.bookings.filter(b => b.userId === userId)).pipe(delay(300));
  }

  getBookingById(id: number): Observable<Booking | undefined> {
    return of(this.bookings.find(b => b.id === id)).pipe(delay(250));
  }

  cancelBooking(id: number): Observable<Booking | undefined> {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = 'cancelled';
      this.bookings$.next(this.bookings);
    }
    return of(booking).pipe(delay(400));
  }

  updateBooking(id: number, updates: Partial<Booking>): Observable<Booking | undefined> {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      Object.assign(booking, updates);
      this.bookings$.next(this.bookings);
    }
    return of(booking).pipe(delay(350));
  }
}
