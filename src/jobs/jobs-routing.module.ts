import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { JobListComponent } from './job-list/job-list.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { PageNotFoundComponent } from '../ecorecruit/errors/page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: '', component: JobsComponent, children: [
      { path: 'job-list', component: JobListComponent, data: { pageTitle: 'ListOfJobs' } },
      { path: 'create-job', component: CreateJobComponent, data: { pageTitle: 'CreateJob' } },
      { path: 'update-job', component: UpdateJobComponent, data: { pageTitle: 'UpdateJob' } },
      { path: 'job-detail', component: JobDetailComponent, data: { pageTitle: 'JobDetail' } },
      { path: '**', component: PageNotFoundComponent, data: { pageTitle: 'PageNotFound' } }
    ]
  },
  { path: '', redirectTo: '/jobs', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule, RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class JobsRoutingModule { }
export const JobsRoutingComponent = 
[
   JobListComponent,
   CreateJobComponent,
   UpdateJobComponent,
   JobDetailComponent
]