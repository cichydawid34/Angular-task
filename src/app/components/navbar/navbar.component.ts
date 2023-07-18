import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userName: string | undefined;
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    const jwtToken = this.cookieService.get('jwtToken');
    const tokenPayload: any = jwtDecode(jwtToken);
    console.log(tokenPayload);
    this.userName = tokenPayload.companyName;
  }

  logOut(): void {
    this.cookieService.delete('jwtToken');
    this.userName = '';
    location.reload();
  }
}
