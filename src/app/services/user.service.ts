import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '9876543210'
    },
    {
      id: 2,
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      phone: '9123456789'
    }
  ];

  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    this.checkExistingAuth();
  }

  private checkExistingAuth() {
    const authEmail = localStorage.getItem('userEmail');
    if (authEmail) {
      const user = this.users.find(u => u.email === authEmail);
      if (user) {
        this.currentUser$.next(user);
      }
    }
  }

  registerUser(email: string, firstName: string, lastName: string, phone: string, password: string): Observable<User> {
    const newUser: User = {
      id: this.users.length + 1,
      email,
      firstName,
      lastName,
      phone,
      password
    };
    this.users.push(newUser);
    return of(newUser).pipe(delay(500));
  }

  loginUser(email: string, password: string): Observable<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAdmin', email === 'admin@example.com' ? 'true' : 'false');
      this.currentUser$.next(user);
      return of(user).pipe(delay(300));
    }
    return of(null).pipe(delay(300));
  }

  getCurrentUser(): Observable<User | null> {
    return of(this.currentUser$.value).pipe(delay(200));
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(u => u.id === id)).pipe(delay(200));
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(300));
  }

  updateUserProfile(id: number, updates: Partial<User>): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updates);
      if (this.currentUser$.value?.id === id) {
        this.currentUser$.next(user);
      }
    }
    return of(user).pipe(delay(350));
  }

  logoutUser(): Observable<void> {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAdmin');
    this.currentUser$.next(null);
    return of(void 0).pipe(delay(200));
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
