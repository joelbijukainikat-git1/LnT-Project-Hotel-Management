import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.css']
})
export class BookingFormComponent {

  constructor(private bookingService: BookingService) {}

  bookRoom() {
    this.bookingService.addBooking({
      hotelName: 'Grand Palace',
      roomType: 'Deluxe',
      amount: 3000
    });

    alert('Booking Successful');
  }
}

