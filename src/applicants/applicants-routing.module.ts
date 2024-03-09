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
import { WorkExperienceComponent } from './profile/work-experience/work-experience.component';
import { EducationComponent } from './profile/education/education.component';
import { TrainingComponent } from './profile/training/training.component';
import { LanguageComponent } from './profile/language/language.component';
import { SkillComponent } from './profile/skills/skills.component';
import { CertificatesAwardedComponent } from './profile/certificates-awarded/certificates-awarded.component';
import { ProjectsComponent } from './profile/projects/projects.component';
import { CoverLetterComponent } from './profile/cover-letters/cover-letters.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicantsComponent,
    children: [
      { path: 'profile', component: ProfileComponent, data: { pageTitle: 'Applicant Profile' }, canActivate: [AppRouteGuard] },
      { path: 'profile/detail-profile', component: DetailProfileComponent, data: { pageTitle: 'Applicant Details' } },
      { path: 'profile/headline-profile', component: HeadlineProfileComponent, data: { pageTitle: 'Applicant Headline' } },
      { path: 'profile/score-profile', component: ScoreProfileComponent, data: { pageTitle: 'Online CV Score' } },
      { path: 'profile/create-profile', component: CreateProfileComponent, data: { pageTitle: 'Create Profile' } },
      { path: 'profile/update-profile', component: UpdateProfileComponent, data: { pageTitle: 'Update Profile' } },
      { path: 'profile/work-experience', component: WorkExperienceComponent, data: { pageTitle: 'Work EXperience' } },
      { path: 'profile/certificates-awarded', component: CertificatesAwardedComponent, data: { pageTitle: 'Certificates Awarded' } },
      { path: 'profile/project', component: ProjectsComponent, data: { pageTitle: 'Projects' } },
      { path: 'profile/education', component: EducationComponent, data: { pageTitle: 'Education' } },
      { path: 'profile/training', component: TrainingComponent, data: { pageTitle: 'Training' } },
      { path: 'profile/language', component: LanguageComponent, data: { pageTitle: 'Language' } },
      { path: 'profile/skill', component: SkillComponent, data: { pageTitle: 'Skill' } },
      { path: 'profile/cover-letter', component: CoverLetterComponent, data: { pageTitle: 'Cover Letter' } },
      { path: 'how-to-apply', component: HowToApplyComponent, data: { pageTitle: 'How to apply' } },
      { path: 'contact-us', component: ContactUsComponent, data: { pageTitle: 'Contact Us' } },
      { path: 'vacancies', component: VacanciesComponent, data: { pageTitle: 'Current Vacancies' } },
      { path: 'applications', component: ApplicationsComponent, data: { pageTitle: 'My Applications' } },
      { path: '**', component: PageNotFoundComponent, data: { pageTitle: 'Page Not Found' } },
    ]

  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsRoutingModule { }
