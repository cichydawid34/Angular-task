import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign.service';
import { UserService } from '../../../services/user.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss'],
})
export class CampaignEditComponent {
  campaignId: string = '';
  campaignForm: FormGroup;
  keywordsCtrl = new FormControl();
  loggedInUser: any;
  filteredKeywords: Observable<string[]>;
  selectedKeywords: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allKeywords: string[] = [
    'Electronic',
    'Fashion',
    'Sport',
    'Beauty',
    'Travel',
    'Travel',
  ];

  @ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dialogRef: MatDialogRef<CampaignEditComponent>,
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private authService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { campaignId: string }
  ) {
    this.campaignForm = this.formBuilder.group({
      campaignName: ['', Validators.required],
      keywords: [''],
      bidAmount: [0, Validators.required],
      campaignFund: [0, Validators.required],
      status: ['false'],
      town: [''],
      radius: [0, Validators.required],
    });

    this.filteredKeywords = this.keywordsCtrl.valueChanges.pipe(
      startWith(null),
      map((keyword: string | null) =>
        keyword ? this.filterKeywords(keyword) : this.allKeywords.slice()
      )
    );
  }
  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.campaignId = this.data.campaignId; // Add this line to assign the correct campaignId
    this.fetchCampaignDetails();
  }
  fetchCampaignDetails(): void {
    this.campaignService.getCampaign(this.data.campaignId).subscribe(
      (campaignData: any) => {
        this.campaignForm.patchValue({
          campaignName: campaignData.campaignName,
          keywords: '',
          bidAmount: campaignData.bidAmount,
          campaignFund: campaignData.campaignFund,
          status: campaignData.status === 'On',
          town: campaignData.town,
          radius: campaignData.radius,
        });
        this.selectedKeywords = campaignData.keywords;
      },
      (error: any) => {
        console.error('Error fetching campaign details:', error);
      }
    );
  }

  submitEditCampaignForm(): void {
    if (this.campaignForm.valid && this.loggedInUser) {
      const updatedCampaign = this.campaignForm.value;
      updatedCampaign.status = updatedCampaign.status ? 'On' : 'Off';
      updatedCampaign.keywords = this.selectedKeywords;

      this.campaignService
        .updateCampaign(this.campaignId, updatedCampaign)
        .subscribe(
          (response: unknown) => {
            console.log('Campaign updated successfully:', response);
            this.dialogRef.close(true); // Close the dialog and pass true as a result
          },
          (error: unknown) => {
            console.error('Error updating campaign:', error);
          }
        );
    } else {
      console.error('User not authenticated');
      console.error(this.campaignForm);
    }
  }

  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedKeywords.push(value);
    }

    event.chipInput!.clear();
    this.keywordsCtrl.setValue(null);
  }

  removeKeyword(keyword: string): void {
    const index = this.selectedKeywords.indexOf(keyword);

    if (index >= 0) {
      this.selectedKeywords.splice(index, 1);
    }
  }

  selectedKeyword(event: MatAutocompleteSelectedEvent): void {
    this.selectedKeywords.push(event.option.viewValue);
    this.keywordInput.nativeElement.value = '';
    this.keywordsCtrl.setValue(null);
  }

  private filterKeywords(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(filterValue)
    );
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
