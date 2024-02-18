import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { AccountComponent } from 'account/account.component';
import { EcorecruitComponent } from 'ecorecruit/ecorecruit.component';

const routes: Routes = [

    { path: '', component: EcorecruitComponent },
    { path: 'app', loadChildren: () => import('./app/app.module').then(m => m.AppModule) },
    { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
    { path: 'account', loadChildren: () => import('account/account.module').then(m => m.AccountModule), data: { preload: true } },
    { path: 'admin', loadChildren: () => import('app/app.module').then(m => m.AppModule), data: { preload: true } },
    { path: 'applicants', loadChildren: () => import('./applicants/applicants.module').then(m => m.ApplicantsModule) },
    { path: 'ecorecruit', loadChildren: () => import('./ecorecruit/ecorecruit.module').then(m => m.EcorecruitModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }