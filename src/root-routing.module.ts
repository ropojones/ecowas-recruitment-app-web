import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AppComponent } from '@app/app.component';
import { AccountComponent } from 'account/account.component';

const routes: Routes = [
    { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
    { path: '', redirectTo: '/ecorecruit', pathMatch: 'full' },
    {
        path: 'account',
        loadChildren: () => import('account/account.module').then(m => m.AccountModule), // Lazy load account module
        data: { preload: true }
    },

    {
        path: 'app',
        loadChildren: () => import('app/app.module').then(m => m.AppModule), // Lazy load account module
        data: { preload: true }
    },
    { path: 'applicants', loadChildren: () => import('./applicants/applicants.module').then(m => m.ApplicantsModule) },
    { path: 'ecorecruit', loadChildren: () => import('./ecorecruit/ecorecruit.module').then(m => m.EcorecruitModule) },


   
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }