import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private _authState = new BehaviorSubject<boolean>(false);
  authState = this._authState.asObservable();

  constructor() {
    this._authState.next(!!this.getToken());
  }

  signOut(): void {
    window.sessionStorage.clear();
    this._authState.next(false);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this._authState.next(true);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    // Emit auth state change after saving user
    this._authState.next(true);
  }

  public getUser(): any {
    try {
      const userStr = window.sessionStorage.getItem(USER_KEY);
      if (userStr) {
        const user = JSON.parse(userStr);
        return user || {};
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return {};
  }
}
