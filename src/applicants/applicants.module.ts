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
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { BrowserModule, Title } from '@angular/platform-browser';

//profile
import { ApplicantProfileComponent } from './profile/applicant-profile/applicant-profile.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';

//expereince
import { ApplicantExperienceComponent } from './experience/applicant-experience/applicant-experience.component';
import { CreateExperienceComponent } from './experience/create-experience/create-experience.component'
import { UpdateExperienceComponent } from './experience/update-experience/update-experience.component'

@NgModule({
  declarations: [
    ApplicantsComponent,
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    ApplicantProfileComponent,
    CreateProfileComponent,
    UpdateProfileComponent,
    ApplicantExperienceComponent,
    UpdateExperienceComponent,
    CreateExperienceComponent,
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
    
  ]
})
export class ApplicantsModule { }
