import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  registerUser(
    companyName: string,
    password: string,
    emeraldAmount: number
  ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      companyName,
      password,
      emeraldAmount,
    });
  }

  loginUser(companyName: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      {
        companyName,
        password,
      },
      { responseType: 'text' }
    );
  }
}
