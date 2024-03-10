import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantsRoutingModule } from './applicants-routing.module';
import { ApplicantsComponent } from './applicants.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApplicantHeaderComponent } from './layout/applicant-header/applicant-header.component';
import { ApplicantFooterComponent } from './layout/applicant-footer/applicant-footer.component';
import { ApplicantLeftNavbarComponent } from './layout/applicant-left-navbar/applicant-left-navbar.component';
import { ApplicantLanguageMenuComponent } from './layout/applicant-language-menu/applicant-language-menu.component';
import { ApplicantSidebarComponent } from './layout/applicant-sidebar/applicant-sidebar.component';
import { ApplicantSidebarMenuComponent } from './layout/applicant-sidebar-menu/applicant-sidebar-menu.component';
import { ApplicantSidebarUserPanelComponent } from './layout/applicant-sidebar-user-panel/applicant-sidebar-user-panel.component';
import { ApplicantSidebarLogoComponent } from './layout/applicant-sidebar-logo/applicant-sidebar-logo.component';
import { ApplicantHeaderUserMenuComponent } from './layout/applicant-header-user-menu/applicant-header-user-menu.component';
import { HowToApplyComponent } from './how-to-apply/how-to-apply.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { ApplicationsComponent } from './applications/applications.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { MaterialModule } from '../material/material.module';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { LanguageComponent } from './profile/language/language.component';
import { ProjectsComponent } from './profile/projects/projects.component';
import { CoverLetterComponent } from './profile/cover-letters/cover-letters.component';
import { EditEducationComponent } from './profile/education/edit-education/edit-education.component'; 
import { AddEducationComponent } from './profile/education/add-education/add-education.component';
import { DeleteEducationComponent } from './profile/education/delete-education/delete-education.component';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DeleteWorkExperienceComponent } from './profile/work-experience/delete-workexperience/delete-workexperience.component';
import { EditWorkExperienceComponent } from './profile/work-experience/edit-workexperience/edit-workexperience.component';
import { AddWorkExperienceComponent } from './profile/work-experience/add-workexperience/add-workexperience.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AddCertificateAwardedComponent } from './profile/certificates-awarded/add-certificate-awarded/add-certificate-awarded.component';
import { EditCertificateAwardedComponent } from './profile/certificates-awarded/edit-certificate-awarded/edit-certificate-awarded.component';
import { DeleteCertificateAwardedComponent } from './profile/certificates-awarded/delete-certificate-awarded/delete-certificate-awarded.component';
import { AddTrainingComponent } from './profile/training/add-training/add-training.component';
import { EditTrainingComponent } from './profile/training/edit-training/edit-training.component';
import { DeleteTrainingComponent } from './profile/training/delete-training/delete-training.component';
import { EditSkillComponent } from './profile/skills/edit-skill/edit-skill.component';
import { AddSkillComponent } from './profile/skills/add-skill/add-skill.component';
import { DeleteSkillComponent } from './profile/skills/delete-skill/delete-skill.component';
import { DeleteLanguageComponent } from './profile/language/delete-language/delete-language.component';
import { EditLanguageComponent } from './profile/language/edit-language/edit-language.component';
import { AddLanguageComponent } from './profile/language/add-language/add-language.component';
import { AddProjectComponent } from './profile/projects/add-project/add-project.component';
import { DeleteProjectComponent } from './profile/projects/delete-project/delete-project.component';
import { EditProjectComponent } from './profile/projects/edit-project/edit-project.component';
import { EditCoverLetterComponent } from './profile/cover-letters/edit-cover-letter/edit-cover-letter.component';
import { AddCoverLetterComponent } from './profile/cover-letters/add-cover-letter/add-cover-letter.component';
import { DeleteCoverLetterComponent } from './profile/cover-letters/delete-cover-letter/delete-cover-letter.component';
// layout

//expereince


@NgModule({
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  declarations: [
    ApplicantsComponent,
    ApplicantHeaderComponent,
    ApplicantFooterComponent,
    ApplicantLeftNavbarComponent,
    ApplicantLanguageMenuComponent,
    ApplicantSidebarComponent,
    ApplicantSidebarMenuComponent,
    ApplicantSidebarUserPanelComponent,
    ApplicantSidebarLogoComponent,
    ApplicantHeaderUserMenuComponent,
    HowToApplyComponent,
    VacanciesComponent,
    ApplicationsComponent,
    FaqsComponent,
    CreateProfileComponent,
    UpdateProfileComponent,  
    EditEducationComponent,
    AddEducationComponent,
    DeleteEducationComponent,
    DeleteWorkExperienceComponent,
    EditWorkExperienceComponent,
    AddWorkExperienceComponent,
    AddCertificateAwardedComponent,
    EditCertificateAwardedComponent,
    DeleteCertificateAwardedComponent,
    AddTrainingComponent,
    EditTrainingComponent,
    DeleteTrainingComponent,
    EditSkillComponent,
    AddSkillComponent,
    DeleteSkillComponent,
    DeleteLanguageComponent,
    EditLanguageComponent,
    AddLanguageComponent,
    AddProjectComponent,
    DeleteProjectComponent,
    EditProjectComponent,
    EditCoverLetterComponent,
    AddCoverLetterComponent,
    DeleteCoverLetterComponent,
   
  ],
  imports: [
    
    CommonModule, 
    ApplicantsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MaterialModule,
    EditorModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
   
    
  ]
})
export class ApplicantsModule { }
