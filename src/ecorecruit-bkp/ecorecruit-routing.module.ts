import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcorecruitComponent } from './ecorecruit.component';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [
  { path: '', component: EcorecruitComponent },
  { path: 'default', component: DefaultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcorecruitRoutingModule { }
