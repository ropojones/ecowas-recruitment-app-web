import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcorecruitRoutingModule } from './ecorecruit-routing.module';
import { EcorecruitComponent } from './ecorecruit.component';
import { ChecksComponent } from './checks/checks.component';
import { ErrorsComponent } from './errors/errors.component';
import { CountriesComponent } from './countries/countries.component';
import { DefaultComponent } from './default/default.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        EcorecruitComponent,
        ChecksComponent,
        ErrorsComponent,
        CountriesComponent,
        PageNotFoundComponent,
        DefaultComponent,
     
    ],
    imports: [
        CommonModule,
        EcorecruitRoutingModule,
        SharedModule
    ]
})
export class EcorecruitModule { }
