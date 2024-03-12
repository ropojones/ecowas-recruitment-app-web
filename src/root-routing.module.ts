import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'ecorecruit/app.component';

const routes: Routes = [

    { path: '', component: AppComponent },
    { path: 'ecorecruit', loadChildren: () => import('./ecorecruit/app.module').then(m => m.AppModule) },
    { path: 'account', loadChildren: () => import('account/account.module').then(m => m.AccountModule), data: { preload: true } },
    { path: 'admin', loadChildren: () => import('ecorecruit/app.module').then(m => m.AppModule), data: { preload: true } },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }