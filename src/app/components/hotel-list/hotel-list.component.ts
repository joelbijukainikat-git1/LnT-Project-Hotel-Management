import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { HighlightBookedDirective } from '../../directives/highlight-booked.directive';
import { HighlightDiscountDirective } from '../../directives/highlight-discount.directive';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HighlightBookedDirective,
    HighlightDiscountDirective
  ],
  templateUrl: './hotel-list.html',
  styleUrls: ['./hotel-list.css']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedLocation = '';
  selectedMaxPrice = 6000;
  selectedMinRating = 0;
  loading = false;

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.loading = true;
    this.hotelService.getAllHotels().subscribe((hotels) => {
      this.hotels = hotels;
      this.loading = false;
    });
  }

  get filteredHotels(): Hotel[] {
    let result = this.hotels;
    if (this.selectedLocation) {
      result = result.filter(h => h.location.toLowerCase().includes(this.selectedLocation.toLowerCase()));
    }
    if (this.selectedMaxPrice) {
      result = result.filter(h => h.pricePerNight <= this.selectedMaxPrice);
    }
    if (this.selectedMinRating) {
      result = result.filter(h => h.rating >= this.selectedMinRating);
    }
    return result;
  }
}
