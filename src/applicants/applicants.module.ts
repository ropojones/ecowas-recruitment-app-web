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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// layout

//expereince


@NgModule({
  declarations: [
    ApplicantsComponent,
    routingComponents,

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
    
  ]
})
export class ApplicantsModule { }
