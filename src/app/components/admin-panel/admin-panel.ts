import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {
  adminName = 'Administrator';
  totalBookings = 45;
  totalHotels = 3;
  totalUsers = 120;

  logout() {
    localStorage.removeItem('isAdmin');
    alert('Logged out from admin panel');
  }
}

