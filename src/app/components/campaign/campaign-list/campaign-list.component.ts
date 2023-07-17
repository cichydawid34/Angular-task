import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Campaign from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignAddComponent } from '../campaign-add/campaign-add.component';

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
  constructor(
    private campaignService: CampaignService,
    public dialog: MatDialog
  ) {
    this.campaigns$ = [];
  }

  ngOnInit(): void {
    //Get Campaigns
    this.campaignService.getCampaigns().subscribe((response: Campaign[]) => {
      this.campaigns$ = response;
      console.log(this.campaigns$);
    });
  }
  //Open Add campaign dialog
  addCampaignDialog() {
    let dialogRef = this.dialog.open(CampaignAddComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
