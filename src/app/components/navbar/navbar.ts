import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  showLoginModal = false;
  showAdminLoginModal = false;
  showSuccessMessage = false;
  showAdminSuccessMessage = false;
  username = '';
  password = '';
  adminPassword = '';
  successMessage = '';
  adminSuccessMessage = '';

  ngOnInit() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  openLoginModal() {
    this.showLoginModal = true;
    this.username = '';
    this.password = '';
    this.showSuccessMessage = false;
  }

  closeLoginModal() {
    this.showLoginModal = false;
    this.showSuccessMessage = false;
  }

  submitLogin() {
    if (this.username.trim() && this.password.trim()) {
      localStorage.setItem('isAuthenticated', 'true');
      this.isAuthenticated = true;
      this.successMessage = `Welcome, ${this.username}! Successfully logged in.`;
      this.showSuccessMessage = true;
      
      setTimeout(() => {
        this.closeLoginModal();
      }, 2000);
    } else {
      alert('Please enter both username and password');
    }
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.isAuthenticated = false;
    alert('Logged out successfully!');
  }

  openAdminLoginModal() {
    this.showAdminLoginModal = true;
    this.adminPassword = '';
    this.showAdminSuccessMessage = false;
  }

  closeAdminLoginModal() {
    this.showAdminLoginModal = false;
    this.showAdminSuccessMessage = false;
  }

  submitAdminLogin() {
    if (this.adminPassword.trim() === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      this.isAdmin = true;
      this.adminSuccessMessage = 'Admin access granted successfully!';
      this.showAdminSuccessMessage = true;
      
      setTimeout(() => {
        this.closeAdminLoginModal();
      }, 2000);
    } else {
      alert('Invalid admin password');
      this.adminPassword = '';
    }
  }
}
