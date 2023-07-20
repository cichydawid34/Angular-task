import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://cichycampaign-api.onrender.com/users';
  // private baseUrl = 'http://localhost:5000/users';
  private emeraldAccountBalanceSubject = new BehaviorSubject<number>(0);
  emeraldAccountBalance$ = this.emeraldAccountBalanceSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  //Register User
  registerUser(
    companyName: string,
    password: string,
    emeraldAmount: number
  ): Observable<string> {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      companyName,
      password,
      emeraldAmount,
    });
  }
  //Login User
  loginUser(companyName: string, password: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/login`,
      {
        companyName,
        password,
      },
      { responseType: 'text' }
    );
  }
  //Get User
  getLoggedInUser(): string | null {
    const token = this.cookieService.get('jwtToken');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: string = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  //Get emerald account
  getEmeraldAccount(): Observable<number> {
    const token = this.cookieService.get('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.post<number>(
      `${this.baseUrl}/emerald-account`,
      {},
      { headers }
    );
  }
  updateEmeraldAccountBalance(balance: number): void {
    this.emeraldAccountBalanceSubject.next(balance);
  }
}
