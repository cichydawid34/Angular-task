import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Campaign from '../models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private http: HttpClient) {}
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>('http://localhost:5000/');
  }
}
