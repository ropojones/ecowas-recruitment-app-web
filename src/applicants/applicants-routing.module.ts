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
import { HowToApplyComponent } from './how-to-apply/how-to-apply.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { ApplicationsComponent } from './applications/applications.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicantsComponent,
    children: [
      { path: 'profile', component: ProfileComponent, data: { pageTitle: 'Applicant Profile'},  canActivate: [AppRouteGuard]},
      { path: 'profile/detail-profile', component: DetailProfileComponent, data: { pageTitle: 'Applicant Details' } },
      { path: 'profile/headline-profile', component: HeadlineProfileComponent, data: { pageTitle: 'Applicant Headline' } },
      { path: 'profile/score-profile', component: ScoreProfileComponent, data: { pageTitle: 'Online CV Score' } },
      { path: 'profile/create-profile', component: CreateProfileComponent, data: { pageTitle: 'Create Profile' } },
      { path: 'profile/update-profile', component: UpdateProfileComponent, data: { pageTitle: 'Update Profile' } } ,
      { path: 'how-to-apply', component: HowToApplyComponent, data: { pageTitle: 'How to apply' } } ,
      { path: 'contact-us', component: ContactUsComponent, data: { pageTitle: 'Contact Us' } }, 
      { path: 'vacancies', component: VacanciesComponent, data: { pageTitle: 'Contact Us' } } ,
      { path: 'applications', component: ApplicationsComponent, data: { pageTitle: 'My Applications' } } ,
    ]
    
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsRoutingModule { }
export const routingComponents = [ApplicantsComponent, ProfileComponent, DetailProfileComponent, HeadlineProfileComponent, ScoreProfileComponent, 
                                  CreateProfileComponent, UpdateProfileComponent, HowToApplyComponent, ContactUsComponent]
