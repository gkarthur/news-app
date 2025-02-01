import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  isEditor = false;
  isAdmin = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateLoginStatus();
    // Subscribe to auth state changes
    this.tokenStorageService.authState.subscribe(() => {
      console.log('Auth state changed, updating status'); // Debug log
      this.updateLoginStatus();
    });
  }

  private updateLoginStatus(): void {
    const token = this.tokenStorageService.getToken();
    this.isLoggedIn = !!token;
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log('Current user data:', user); // Debug log
      
      // Try different possible username fields
      this.username = user.username || user.sub || user.email;
      
      // Handle roles
      let roles: string[] = [];
      if (user.roles) {
        roles = Array.isArray(user.roles) ? user.roles :
               typeof user.roles === 'string' ? [user.roles] : [];
      }
      console.log('User roles:', roles); // Debug log
      
      this.isEditor = roles.some((role: string) => 
        role.toUpperCase().includes('EDITOR') || role.toUpperCase() === 'ROLE_EDITOR'
      );
      this.isAdmin = roles.some((role: string) => 
        role.toUpperCase().includes('ADMIN') || role.toUpperCase() === 'ROLE_ADMIN'
      );
      
      console.log('Is editor:', this.isEditor, 'Is admin:', this.isAdmin); // Debug log
    } else {
      this.username = undefined;
      this.isEditor = false;
      this.isAdmin = false;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.updateLoginStatus(); // Update status immediately
    this.router.navigate(['/login']);
  }
}
