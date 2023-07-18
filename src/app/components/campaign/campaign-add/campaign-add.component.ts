import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from 'src/app/services/campaign.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.scss'],
})
export class CampaignAddComponent {
  addCampaignForm: FormGroup;
  loggedInUser: any;

  constructor(
    private CampaignService: CampaignService,
    private formBuilder: FormBuilder,
    private authService: UserService
  ) {
    this.addCampaignForm = this.formBuilder.group({
      campaignName: ['', Validators.required],
      keywords: [''],
      bidAmount: [0, Validators.min(2)],
      campaignFund: [0, Validators.min(2)],
      status: ['On'],
      town: [''],
      radius: [0, Validators.min(2)],
    });
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  submitAddCampaignForm(): void {
    if (this.addCampaignForm.valid && this.loggedInUser) {
      const campaignData = this.addCampaignForm.value;
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
    }
  }
}
