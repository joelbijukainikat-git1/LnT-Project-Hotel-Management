import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="home-container">
      <h1>Welcome to Hotel Booking System</h1>
      <p>Select an option from the menu to get started.</p>
      <a routerLink="/hotels" class="link-button">Browse Hotels</a>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 40px 20px;
    }

    .home-container h1 {
      font-size: 28px;
      margin-bottom: 15px;
    }

    .home-container p {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }

    .link-button {
      display: inline-block;
      background-color: #4CAF50;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }

    .link-button:hover {
      background-color: #45a049;
    }
  `]
})
export class HomeComponent {}
