import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css']
})
export class HotelListComponent {

  selectedLocation = '';

  hotels = [
    { id: 1, name: 'Grand Palace', location: 'Bangalore', price: 3000, rating: 4.5, available: true },
    { id: 2, name: 'City Inn', location: 'Chennai', price: 2000, rating: 4.0, available: false },
    { id: 3, name: 'Sea View', location: 'Goa', price: 5000, rating: 4.8, available: true }
  ];

  get filteredHotels() {
    if (!this.selectedLocation) return this.hotels;
    return this.hotels.filter(h => h.location === this.selectedLocation);
  }
}
