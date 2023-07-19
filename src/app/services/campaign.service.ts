import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Campaign from '../models/campaign';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  baseUrl = `https://cichycampaign-api.onrender.com/Campaigns/`;
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

    return this.http.get<Campaign[]>(
      'https://cichycampaign-api.onrender.com/Campaigns',
      {
        params,
        withCredentials: true,
      }
    );
  }

  //Get campaign
  getCampaign(campaignId: string): Observable<Campaign> {
    const url = `https://cichycampaign-api.onrender.com/Campaigns/${campaignId}`;
    return this.http.get<Campaign>(url, { withCredentials: true });
  }

  //Post campaign
  addCampaign(campaignData: Campaign): Observable<any> {
    return this.http.post<any>(
      'https://cichycampaign-api.onrender.com/Campaigns',
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
    const url = `https://cichycampaign-api.onrender.com/Campaigns/${campaignId}`;
    return this.http.delete<void>(url);
  }
}
