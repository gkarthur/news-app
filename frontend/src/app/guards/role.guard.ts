import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private router: Router,
    private tokenService: TokenStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.tokenService.getUser();
    if (user && user.roles) {
      const requiredRoles = route.data['roles'] as Array<string>;
      if (requiredRoles && requiredRoles.some(role => user.roles.includes(role))) {
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}
