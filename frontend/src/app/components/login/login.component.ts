import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        console.log('Login response:', data);  // Debug log
        
        if (data && data.token) {
          // Save token first
          this.tokenStorage.saveToken(data.token);
          
          // Create user object with all necessary fields
          const userData = {
            username: data.username || username,  // Fallback to form username if not in response
            roles: data.roles || [],
            token: data.token,
            ...data  // Include any other fields from response
          };
          
          console.log('Saving user data:', userData);  // Debug log
          this.tokenStorage.saveUser(userData);
          
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          
          // Navigate after successful login
          this.router.navigate(['/']);
        } else {
          console.error('No token in response');
          this.isLoginFailed = true;
          this.errorMessage = 'Login failed: No token received';
        }
      },
      error: (err) => {
        console.error('Login error:', err);  // Debug log
        this.errorMessage = err.error?.message || 'Login failed';
        this.isLoginFailed = true;
      }
    });
  }
}
