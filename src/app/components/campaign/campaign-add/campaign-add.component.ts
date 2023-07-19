import { Component, ElementRef, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.scss'],
})
export class CampaignAddComponent {
  addCampaignForm: FormGroup;
  keywordsCtrl = new FormControl();
  loggedInUser: any;
  filteredKeywords: Observable<string[]>;
  selectedKeywords: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allKeywords: string[] = [
    'Electronic',
    'Fashion ',
    'Sport',
    'Beauty',
    'Travel',
    'Travel',
  ];

  @ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private CampaignService: CampaignService,
    private formBuilder: FormBuilder,
    private authService: UserService
  ) {
    this.addCampaignForm = this.formBuilder.group({
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
  }

  //Submit Form
  submitAddCampaignForm(): void {
    if (this.addCampaignForm.valid && this.loggedInUser) {
      const campaignData = this.addCampaignForm.value;
      campaignData.status = campaignData.status ? 'On' : 'Off';
      campaignData.keywords = this.selectedKeywords;
      this.CampaignService.addCampaign(campaignData).subscribe({
        next: (response: unknown) => {
          console.log('Campaign added successfully:', response);
        },
        error: (error: unknown) => {
          console.error('Error adding campaign:', error);
        },
      });
    } else {
      console.error('User not authenticated');
      console.error(this.addCampaignForm);
    }
  }
  //Add keyword
  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the keyword
    if (value) {
      this.selectedKeywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.keywordsCtrl.setValue(null);
  }

  //Remove keyword
  removeKeyword(keyword: string): void {
    const index = this.selectedKeywords.indexOf(keyword);

    if (index >= 0) {
      this.selectedKeywords.splice(index, 1);
    }
  }
  //Select keywords
  selectedKeyword(event: MatAutocompleteSelectedEvent): void {
    this.selectedKeywords.push(event.option.viewValue);
    this.keywordInput.nativeElement.value = '';
    this.keywordsCtrl.setValue(null);
    //Filter Keywords
  }

  //Filter Keywords
  private filterKeywords(value: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.allKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(filterValue)
    );
  }
  //Format slider
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
