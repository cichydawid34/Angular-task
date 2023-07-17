import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAddComponent } from './campaign-add.component';

describe('CampaignAddComponent', () => {
  let component: CampaignAddComponent;
  let fixture: ComponentFixture<CampaignAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignAddComponent]
    });
    fixture = TestBed.createComponent(CampaignAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
