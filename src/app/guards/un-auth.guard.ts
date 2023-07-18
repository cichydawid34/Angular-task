import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class unauthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(): boolean {
    if (!this.cookieService.get('jwtToken')) {
      return true;
    } else {
      this.router.navigate(['/main']);
      return false;
    }
  }
}
