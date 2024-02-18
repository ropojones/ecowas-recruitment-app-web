import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantsComponent } from './applicants.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component'
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailProfileComponent } from './profile/detail-profile/detail-profile.component';
import { HeadlineProfileComponent } from './profile/headline-profile/headline-profile.component';
import { ScoreProfileComponent } from './profile/score-profile/score-profile.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [
  {
    path: '',
    component: ApplicantsComponent,
    children: [
      { path: 'profile', component: ProfileComponent, data: { pageTitle: 'Applicant Profile'},  canActivate: [AppRouteGuard]},
      { path: 'profile/detail-profile', component: DetailProfileComponent, data: { pageTitle: 'Applicant Details' } },
      { path: 'profile/headline-profile', component: HeadlineProfileComponent, data: { pageTitle: 'Applicant Headline' } },
      { path: 'profile/score-profile', component: ScoreProfileComponent, data: { pageTitle: 'Online CV Score' } },
      { path: 'profile/update-profile', component: UpdateProfileComponent, data: { pageTitle: 'Update Profile' } } 
    ]
    
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsRoutingModule { }
export const routingComponents = [ApplicantsComponent, ProfileComponent, DetailProfileComponent, HeadlineProfileComponent, ScoreProfileComponent, UpdateProfileComponent]
