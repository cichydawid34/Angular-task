import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CampaignListComponent } from './components/campaign/campaign-list/campaign-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CampaignAddComponent } from './components/campaign/campaign-add/campaign-add.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CampaignEditComponent } from './components/campaign/campaign-edit/campaign-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignAddComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    CampaignEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],

  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
