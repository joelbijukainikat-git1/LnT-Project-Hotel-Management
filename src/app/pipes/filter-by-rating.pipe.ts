import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Pipe({
  name: 'filterByRating',
  standalone: true
})
export class FilterByRatingPipe implements PipeTransform {
  transform(hotels: Hotel[], minRating: number): Hotel[] {
    if (!hotels || !minRating) {
      return hotels;
    }
    return hotels.filter(hotel => hotel.rating >= minRating);
  }
}
