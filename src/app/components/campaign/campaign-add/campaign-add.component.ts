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
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.scss'],
})
export class CampaignAddComponent {
  errorMessage: string | null = null;
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
  townOptions: string[] = [
    'Kraków',
    'Tarnów',
    'Warsaw',
    'Gdańsk',
    'Wrocław',
    'Warszawa',
  ];

  @ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private CampaignService: CampaignService,
    private formBuilder: FormBuilder,
    private authService: UserService,
    private dialogRef: MatDialogRef<CampaignAddComponent>
  ) {
    this.addCampaignForm = this.formBuilder.group({
      campaignName: ['', [Validators.required, Validators.minLength(3)]],
      keywords: [''],
      bidAmount: [0.1, [Validators.required, Validators.min(0.1)]],
      campaignFund: [20, [Validators.required, Validators.min(20)]],
      status: ['false'],
      town: [''],
      radius: [1, [Validators.required, Validators.min(1)]],
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
    if (this.addCampaignForm.invalid) {
      return;
    }
    if (this.loggedInUser) {
      const campaignData = this.addCampaignForm.value;
      campaignData.status = campaignData.status ? 'On' : 'Off';
      campaignData.keywords = this.selectedKeywords;
      this.CampaignService.addCampaign(campaignData).subscribe({
        next: (response: unknown) => {
          console.log('Campaign added successfully:', response);
          this.dialogRef.close();
        },
        error: (error: any) => {
          console.error('Error adding campaign:', error.error.errors);

          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              const errorMessage = error.error.errors[key].message;
              this.errorMessage = errorMessage;
            }
          }
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
  onCancel(): void {
    this.dialogRef.close();
  }
}
