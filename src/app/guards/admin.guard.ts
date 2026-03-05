import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is admin (in real app, check from auth service)
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (isAdmin) {
      return true;
    } else {
      console.warn('Admin access denied');
      this.router.navigate(['/']);
      return false;
    }
  }
}
