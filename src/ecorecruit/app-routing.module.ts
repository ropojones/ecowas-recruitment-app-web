import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'ecorecruit/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { JobsComponent } from './jobs/jobs.component';
import { CreateJobComponent } from './jobs/create-job/create-job.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { AboutMeComponent } from './applicant/about-me/about-me.component';
import { AcademicQualificationComponent } from './applicant/academic-qualification/academic-qualification.component';
import { BiodataComponent } from './applicant/biodata/biodata.component';
import { LanguageComponent } from './applicant/language/language.component';
import { ProfileComponent } from './applicant/profile/profile.component';
import { TrainingComponent } from './applicant/training/training.component';
import { SkillsComponent } from './applicant/skills/skills.component';
import { ProjectsComponent } from './applicant/projects/projects.component';
import { WorkExperienceComponent } from './applicant/work-experience/work-experience.component';
import { FilteringComponent } from './filtering/filtering.component';
import { ShortlistingComponent } from './shortlisting/shortlisting.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UpdateJobComponent } from './jobs/update-job/update-job.component';
import { ListJobComponent } from './jobs/list-job/list-job.component';
import { DeleteJobComponent } from './jobs/delete-job/delete-job.component';
import { JobContainerComponent } from './jobs/job-container/job-container.component';
import { JobMenuComponent } from './jobs/job-menu/job-menu.component';
import { DashboardComponent } from './jobs/dashboard/dashboard.component';
import { CertificatesComponent } from './applicant/certificates/certificates.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
                    {
                        path: 'jobs', component: JobsComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard], children: [
                            { path: 'create', component: CreateJobComponent },
                            { path: 'container', component: JobContainerComponent },
                            { path: 'bashboard', component: DashboardComponent },
                            { path: 'menu', component: JobMenuComponent },
                            { path: 'list', component: ListJobComponent },
                            { path: 'update', component: UpdateJobComponent },
                            { path: 'delete', component: DeleteJobComponent }
                        ]
                    },

                    {
                        path: 'applicant', component: ApplicantComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard], children: [
                            { path: 'about-me', component: AboutMeComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard], },
                            { path: 'academic-qualification', component: AcademicQualificationComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard], },
                            { path: 'biodata', component: BiodataComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                            { path: 'certificates', component: CertificatesComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                            { path: 'language', component: LanguageComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                            { path: 'profile', component: ProfileComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                            { path: 'projects', component: ProjectsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                            { path: 'skills', component: SkillsComponent },
                            { path: 'training', component: TrainingComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                            { path: 'work-experience', component: WorkExperienceComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                        ]
                    },
                    { path: 'filtering', component: FilteringComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'shortlisting', component: ShortlistingComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'applications', component: ApplicationsComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
