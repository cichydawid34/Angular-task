import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { CampaignListComponent } from './components/campaign/campaign-list/campaign-list.component';
import { authGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/un-auth.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [unauthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthGuard],
  },
  {
    path: 'main',
    component: CampaignListComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: CampaignListComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
