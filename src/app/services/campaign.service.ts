import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Campaign from '../models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private http: HttpClient) {}
  //Get campaigns
  getCampaigns(
    pageIndex: number,
    pageSize: number,
    sortActive: string,
    sortDirection: string
  ): Observable<Campaign[]> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortActive', sortActive)
      .set('sortDirection', sortDirection);

    return this.http.get<Campaign[]>('http://localhost:5000/Campaigns', {
      params,
    });
  }

  addCampaign(campaignData: Campaign): Observable<any> {
    return this.http.post<any>(
      'http://localhost:5000/Campaigns',
      campaignData,
      { withCredentials: true }
    );
  }

  //Delete campaign
  deleteCampaign(campaignId: number): Observable<any> {
    const url = `http://localhost:5000/Campaigns/${campaignId}`;
    return this.http.delete<any>(url);
  }
}
