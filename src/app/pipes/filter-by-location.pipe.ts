import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Pipe({
  name: 'filterByLocation',
  standalone: true
})
export class FilterByLocationPipe implements PipeTransform {
  transform(hotels: Hotel[], location: string): Hotel[] {
    if (!hotels || !location) {
      return hotels;
    }
    return hotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  }
}
