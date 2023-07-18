import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {
    if (this.cookieService.get('jwtToken')) {
      return true; // User has a JWT token, allow access to the dashboard
    } else {
      this.router.navigate(['/login']); // Redirect to login page if no JWT token
      return false;
    }
  }
}
