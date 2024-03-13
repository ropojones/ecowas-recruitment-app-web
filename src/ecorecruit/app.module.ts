import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

// tenants
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
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
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RolesComponent } from './roles/roles.component';
import { TenantsComponent } from './tenants/tenants.component';
import { CreateUserDialogComponent } from './users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from './users/edit-user/edit-user-dialog.component';
import { UsersComponent } from './users/users.component';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

//jobs
import { JobsComponent } from './jobs/jobs.component';
import { MaterialModule } from 'material/material.module';
import { UpdateJobComponent } from './jobs/update-job/update-job.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { DashboardComponent } from './jobs/dashboard/dashboard.component';
import { DeleteJobComponent } from './jobs/delete-job/delete-job.component';
import { JobMenuComponent } from './jobs/job-menu/job-menu.component';
import { JobContainerComponent } from './jobs/job-container/job-container.component';
import { ListJobComponent } from './jobs/list-job/list-job.component';


//applicants
import { ApplicantComponent } from './applicant/applicant.component';
import { AboutMeComponent } from './applicant/about-me/about-me.component';
import { WorkExperienceComponent } from './applicant/work-experience/work-experience.component';
import { AcademicQualificationComponent } from './applicant/academic-qualification/academic-qualification.component';
import { LanguageComponent } from './applicant/language/language.component';
import { SkillsComponent } from './applicant/skills/skills.component';
import { TrainingComponent } from './applicant/training/training.component';
import { CoverLetterComponent } from './applicant/cover-letter/cover-letter.component';
import { BiodataComponent } from './applicant/biodata/biodata.component';
import { ProfileComponent } from './applicant/profile/profile.component';
import { ProjectsComponent } from './applicant/projects/projects.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ShortlistingComponent } from './shortlisting/shortlisting.component';
import { FilteringComponent } from './filtering/filtering.component';
import { ScoringComponent } from './scoring/scoring.component';
import { CertificatesComponent } from './applicant/certificates/certificates.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    //Applicants
   


    //Jobs
    JobsComponent,
    UpdateJobComponent, 
    CreateJobComponent, 
    DashboardComponent, 
    DeleteJobComponent, 
    JobMenuComponent, 
    JobContainerComponent, 
    ListJobComponent, 
    
    //Applicant
    ApplicantComponent, 
    AboutMeComponent, 
    WorkExperienceComponent, 
    AcademicQualificationComponent, 
    LanguageComponent,
    SkillsComponent,
    TrainingComponent,
    CoverLetterComponent,
    BiodataComponent,
    ProfileComponent,
    ProjectsComponent,
    ApplicationsComponent,
    ShortlistingComponent,
    FilteringComponent,
    ScoringComponent,
    CertificatesComponent,
    JobDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    MaterialModule,
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
  ],
  providers: [ { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }]
})
export class AppModule { }
