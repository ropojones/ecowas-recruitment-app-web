import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantsRoutingModule, routingComponents } from './applicants-routing.module';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from '../material/material.module';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';

// layout

//expereince


@NgModule({
  declarations: [
    ApplicantsComponent,
    routingComponents,
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
    ContactUsComponent,
    VacanciesComponent,
    ApplicationsComponent,
    FaqsComponent,
    CreateProfileComponent,
    UpdateProfileComponent

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
    MaterialModule
    
  ]
})
export class ApplicantsModule { }
