import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  description: string;
  price: number;
  available: boolean;
}

interface Room {
  id: number;
  hotelId: number;
  type: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotel-detail.html',
  styleUrl: './hotel-detail.css',
})
export class HotelDetail implements OnInit {
  hotel: Hotel | null = null;
  rooms: Room[] = [
    { id: 1, hotelId: 1, type: 'Standard', price: 2000, available: true },
    { id: 2, hotelId: 1, type: 'Deluxe', price: 3000, available: true },
    { id: 3, hotelId: 1, type: 'Suite', price: 5000, available: true },
  ];
  selectedCategory: string = 'all';

  // Mock hotel data
  private hotels: Hotel[] = [
    { id: 1, name: 'Grand Palace', location: 'Bangalore', price: 3000, rating: 4.5, description: 'Luxury 5-star hotel', available: true },
    { id: 2, name: 'City Inn', location: 'Chennai', price: 2000, rating: 4.0, description: 'Comfortable 3-star hotel', available: false },
    { id: 3, name: 'Sea View', location: 'Goa', price: 5000, rating: 4.8, description: 'Beach resort with great views', available: true }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const hotelId = parseInt(params['id'], 10);
      this.hotel = this.hotels.find(h => h.id === hotelId) || null;
    });
  }

  get filteredRooms(): Room[] {
    if (this.selectedCategory === 'all') {
      return this.rooms;
    }
    return this.rooms.filter(r => r.type.toLowerCase() === this.selectedCategory.toLowerCase());
  }
}

