import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Campaign from '../models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private http: HttpClient) {}
  //Get campaigns
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>('http://localhost:5000/');
  }

  //Delete campaign
  deleteCampaign(campaignId: number): Observable<any> {
    const url = `http://localhost:5000/${campaignId}`;
    return this.http.delete<any>(url);
  }
}
