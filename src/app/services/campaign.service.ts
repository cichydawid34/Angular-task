import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Campaign from '../models/campaign';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private baseUrl = `https://cichycampaign-api.onrender.com/Campaigns/`;
  //private baseUrl = 'http://localhost:5000/Campaigns';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  //Get campaigns
  getCampaigns(
    pageIndex: number,
    pageSize: number,
    sortActive: string,
    sortDirection: string
  ): Observable<Campaign[]> {
    const token = this.cookieService.get('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortActive', sortActive)
      .set('sortDirection', sortDirection);

    return this.http.get<Campaign[]>(`${this.baseUrl}`, {
      params,
      headers,
    });
  }

  //Get campaign
  getCampaign(campaignId: string): Observable<Campaign> {
    const token = this.cookieService.get('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    const url = `${this.baseUrl}/${campaignId}`;
    return this.http.get<Campaign>(url, { headers });
  }

  //Post campaign
  addCampaign(campaignData: Campaign): Observable<Campaign> {
    const token = this.cookieService.get('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.post<Campaign>(`${this.baseUrl}`, campaignData, {
      headers,
    });
  }
  //Update campaign
  updateCampaign(
    campaignId: string,
    updatedCampaign: Campaign
  ): Observable<Campaign> {
    const url = `${this.baseUrl}/${campaignId}`;
    const token = this.cookieService.get('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    console.log('Constructed URL:', url);

    return this.http.put<Campaign>(url, updatedCampaign, { headers });
  }

  //Delete campaign
  deleteCampaign(campaignId: string): Observable<void> {
    const token = this.cookieService.get('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/${campaignId}`;
    return this.http.delete<void>(url, { headers });
  }
}
