import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Pipe({
  name: 'filterByPrice',
  standalone: true
})
export class FilterByPricePipe implements PipeTransform {
  transform(hotels: Hotel[], maxPrice: number): Hotel[] {
    if (!hotels || !maxPrice) {
      return hotels;
    }
    return hotels.filter(hotel => hotel.pricePerNight <= maxPrice);
  }
}
