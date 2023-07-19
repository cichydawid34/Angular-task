import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Campaign from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignAddComponent } from '../campaign-add/campaign-add.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CampaignEditComponent } from '../campaign-edit/campaign-edit.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaigns$: Campaign[];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Campaign>();
  sortedData: Campaign[] = [];
  emeraldAccountBalance: number = 0;

  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex = 0;
  pageSize = 10;
  totalCampaigns = 0;

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
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.campaigns$ = [];
  }

  ngOnInit(): void {
    this.getCampaigns();
    this.fetchEmeraldAccountBalance();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.getCampaigns();
    });

    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.pageIndex = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize;
      this.getCampaigns();
    });
  }

  //Open AddCampaign dialog
  addCampaignDialog() {
    let dialogRef = this.dialog.open(CampaignAddComponent, {
      height: '700px',
      width: '500px',
    });
  }

  //Open AddCampaign dialog
  editCampaignDialog(campaignId: string) {
    let dialogRef = this.dialog.open(CampaignEditComponent, {
      height: '700px',
      width: '500px',
      data: { campaignId: campaignId },
    });
  }

  //Get Campaigns with Pagination
  getCampaigns(): void {
    const sortActive = this.sort.active;
    const sortDirection = this.sort.direction;

    this.campaignService
      .getCampaigns(
        this.pageIndex + 1,
        this.pageSize,
        sortActive,
        sortDirection
      )
      .subscribe(
        (response: Campaign[]) => {
          this.campaigns$ = response;
          this.totalCampaigns = response.length;
          this.dataSource.data = response;
        },
        (error: any) => {
          console.error('Error getting campaigns:', error);
        }
      );
  }

  //Delete Campaign
  deleteCampaign(campaignId: number): void {
    this.campaignService.deleteCampaign(campaignId).subscribe({
      next: () => {
        console.log(`Campaign with ID ${campaignId} deleted successfully.`);
        this.getCampaigns();
      },
      error: (error) => {
        console.error(`Error deleting campaign with ID ${campaignId}:`, error);
      },
    });
  }
  //Get emerald account
  fetchEmeraldAccountBalance(): void {
    this.userService.getEmeraldAccount().subscribe(
      (response: any) => {
        // Assuming the response contains the emerald account balance value
        this.emeraldAccountBalance = response;
      },
      (error: any) => {
        console.error('Error fetching emerald account balance:', error);
      }
    );
  }
}
