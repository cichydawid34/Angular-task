import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Campaign from '../models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  baseUrl = `http://localhost:5000/Campaigns/`;
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
      withCredentials: true,
    });
  }

  //Get campaign
  getCampaign(campaignId: string): Observable<Campaign> {
    const url = `http://localhost:5000/Campaigns/${campaignId}`;
    return this.http.get<Campaign>(url, { withCredentials: true });
  }

  //Post campaign
  addCampaign(campaignData: Campaign): Observable<any> {
    return this.http.post<any>(
      'http://localhost:5000/Campaigns',
      campaignData,
      { withCredentials: true }
    );
  }
  //Update campaign
  updateCampaign(
    campaignId: string,
    updatedCampaign: Campaign
  ): Observable<any> {
    const url = `${this.baseUrl}/${campaignId}`;
    console.log('Constructed URL:', url);

    return this.http.put<Campaign>(url, updatedCampaign);
  }

  //Delete campaign
  deleteCampaign(campaignId: string): Observable<void> {
    const url = `http://localhost:5000/Campaigns/${campaignId}`;
    return this.http.delete<void>(url);
  }
}
