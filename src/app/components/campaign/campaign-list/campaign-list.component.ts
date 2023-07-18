import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Campaign from 'src/app/models/campaign';
import { CampaignService } from 'src/app/services/campaign.service';
import { CampaignAddComponent } from '../campaign-add/campaign-add.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
    public dialog: MatDialog
  ) {
    this.campaigns$ = [];
  }

  ngOnInit(): void {
    this.getCampaigns();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe((sort: Sort) => {
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
      height: '1000px',
      width: '500px',
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
          this.totalCampaigns = response.length; // Update the total campaigns count for pagination
          this.dataSource.data = response; // Update the MatTableDataSource with the new data
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
        // After successful deletion, you may want to refresh the campaigns list.
        this.getCampaigns();
      },
      error: (error) => {
        console.error(`Error deleting campaign with ID ${campaignId}:`, error);
      },
    });
  }

  //Compare Logic
  private compare(
    a: number | string | boolean,
    b: number | string | boolean,
    isAsc: boolean
  ): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return (a as string).localeCompare(b as string) * (isAsc ? 1 : -1);
    } else {
      return ((a < b ? -1 : 1) * (isAsc ? 1 : -1)) as any;
    }
  }
}
