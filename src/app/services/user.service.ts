import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  registerUser(name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { name, password });
  }

  loginUser(name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { name, password });
  }
}
