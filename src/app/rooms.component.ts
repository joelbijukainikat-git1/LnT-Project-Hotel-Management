import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from './models/room.model';

  @Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html'
})

export class RoomsComponent {

  rooms: Room[] = [
    { id: 1, hotelId: 1, type: 'Deluxe', price: 3000, available: true },
    { id: 2, hotelId: 1, type: 'Suite', price: 5000, available: false },
    { id: 3, hotelId: 2, type: 'Standard', price: 2000, available: true }
  ];

}
