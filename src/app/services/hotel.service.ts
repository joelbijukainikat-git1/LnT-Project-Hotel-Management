import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private hotels: Hotel[] = [
    {
      id: 1,
      name: 'Grand Palace',
      location: 'Mumbai',
      rating: 4.8,
      description: 'Luxury 5-star hotel in the heart of Mumbai with world-class amenities',
      pricePerNight: 5000,
      available: true,
      discount: 0
    },
    {
      id: 2,
      name: 'City Inn',
      location: 'Delhi',
      rating: 4.5,
      description: 'Comfortable mid-range hotel near business district',
      pricePerNight: 2500,
      available: false,
      discount: 15
    },
    {
      id: 3,
      name: 'Sea View Resort',
      location: 'Goa',
      rating: 4.7,
      description: 'Beachfront resort with stunning ocean view',
      pricePerNight: 3500,
      available: true,
      discount: 10
    },
    {
      id: 4,
      name: 'Mountain Lodge',
      location: 'Shimla',
      rating: 4.6,
      description: 'Cozy mountain retreat with scenic views',
      pricePerNight: 2000,
      available: true,
      discount: 0
    },
    {
      id: 5,
      name: 'Tech Park Hotel',
      location: 'Bangalore',
      rating: 4.4,
      description: 'Modern hotel perfect for business travelers',
      pricePerNight: 2800,
      available: false,
      discount: 20
    },
    {
      id: 6,
      name: 'Heritage Palace',
      location: 'Jaipur',
      rating: 4.9,
      description: 'Historic palace converted into luxury accommodation',
      pricePerNight: 6000,
      available: true,
      discount: 5
    }
  ];

  private hotels$ = new BehaviorSubject<Hotel[]>(this.hotels);

  constructor() {}

  getAllHotels(): Observable<Hotel[]> {
    return of(this.hotels).pipe(delay(300));
  }

  getHotelById(id: number): Observable<Hotel | undefined> {
    return of(this.hotels.find(hotel => hotel.id === id)).pipe(delay(250));
  }

  getHotelsByLocation(location: string): Observable<Hotel[]> {
    return of(
      this.hotels.filter(hotel =>
        hotel.location.toLowerCase().includes(location.toLowerCase())
      )
    ).pipe(delay(400));
  }

  getAvailableHotels(): Observable<Hotel[]> {
    return of(this.hotels.filter(hotel => hotel.available)).pipe(delay(350));
  }

  getHotelsByPrice(maxPrice: number): Observable<Hotel[]> {
    return of(this.hotels.filter(hotel => hotel.pricePerNight <= maxPrice)).pipe(
      delay(300)
    );
  }

  getHotelsByRating(minRating: number): Observable<Hotel[]> {
    return of(this.hotels.filter(hotel => hotel.rating >= minRating)).pipe(
      delay(300)
    );
  }

  addHotel(hotel: Omit<Hotel, 'id'>): Observable<Hotel> {
    const newHotel: Hotel = {
      ...hotel,
      id: this.hotels.length + 1
    };
    this.hotels.push(newHotel);
    this.hotels$.next(this.hotels);
    return of(newHotel).pipe(delay(400));
  }

  updateHotel(id: number, updates: Partial<Hotel>): Observable<Hotel | undefined> {
    const hotel = this.hotels.find(h => h.id === id);
    if (hotel) {
      Object.assign(hotel, updates);
      this.hotels$.next(this.hotels);
    }
    return of(hotel).pipe(delay(350));
  }
}
