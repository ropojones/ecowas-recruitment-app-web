import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantsComponent } from './applicants.component';
import { ApplicantProfileComponent } from './profile/applicant-profile/applicant-profile.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { PageNotFoundComponent } from 'ecorecruit/errors/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ApplicantsComponent , children:[
    { path: 'applicant-profile', component: ApplicantProfileComponent, data: { pageTitle: 'ApplicantProfile' } },
    { path: 'create-profile', component: CreateProfileComponent, data: { pageTitle: 'CreateProfile' } },
    { path: 'update-profile', component: UpdateProfileComponent, data: { pageTitle: 'UpdateProfile' } },
    { path: '**', component: PageNotFoundComponent, data: { pageTitle: 'PageNotFound' } }

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsRoutingModule { }
