import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService, Booking } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  totalPrice = 3000;

  roomTypes = ['Standard', 'Deluxe', 'Suite'];
  guestOptions = [1, 2, 3, 4];

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.bookingForm = this.formBuilder.group({
      hotelName: ['Grand Palace', Validators.required],
      roomType: ['Deluxe', Validators.required],
      checkInDate: ['', [Validators.required]],
      checkOutDate: ['', [Validators.required]],
      guests: [2, [Validators.required, Validators.min(1), Validators.max(4)]],
      specialRequests: ['']
    });
  }

  ngOnInit() {
    this.onFormChange();
  }

  onFormChange() {
    this.bookingForm.valueChanges.subscribe(() => {
      this.calculatePrice();
    });
  }

  calculatePrice() {
    const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);

    if (checkIn && checkOut && checkOut > checkIn) {
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const basePrice = 3000;
      this.totalPrice = basePrice * nights;
    }
  }

  isDateValid(): boolean {
    const checkIn = new Date(this.bookingForm.get('checkInDate')?.value);
    const checkOut = new Date(this.bookingForm.get('checkOutDate')?.value);

    if (!checkIn || !checkOut) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) return false;
    if (checkOut <= checkIn) return false;

    return true;
  }

  onBookRoom() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.bookingForm.valid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    if (!this.isDateValid()) {
      this.errorMessage = 'Check-out date must be after check-in date, and dates must be in the future';
      return;
    }

    this.isLoading = true;

    const bookingData: Omit<Booking, 'id'> = {
      userId: 1,
      hotelId: 1,
      hotelName: this.bookingForm.get('hotelName')?.value,
      roomType: this.bookingForm.get('roomType')?.value,
      checkInDate: this.bookingForm.get('checkInDate')?.value,
      checkOutDate: this.bookingForm.get('checkOutDate')?.value,
      guests: this.bookingForm.get('guests')?.value,
      totalPrice: this.totalPrice,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    this.bookingService.addBooking(bookingData).subscribe({
      next: (booking: Booking) => {
        this.successMessage = 'Booking confirmed! Redirecting to dashboard...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Booking failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}

