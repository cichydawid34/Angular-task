import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Campaign from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaigns$: Campaign[];

  displayedColumns: string[] = [
    'campaignName',
    'keywords',
    'status',
    'bidAmount',
    'town',
    'radius',
    'delete',
    'edit',
  ];
  constructor(private campaignService: CampaignService) {
    this.campaigns$ = [];
  }

  ngOnInit(): void {
    this.campaignService.getCampaigns().subscribe((response: Campaign[]) => {
      this.campaigns$ = response;
      console.log(this.campaigns$);
    });
  }
  addCampaignDialog() {}
}
