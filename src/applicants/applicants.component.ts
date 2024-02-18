import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  ApplicantServiceProxy,
  ApplicantDto} from '@shared/service-proxies/service-proxies';
 



class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}


@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css'
})
export class ApplicantsComponent extends AppComponentBase implements OnInit {
  sidebarExpanded: boolean;
  applicant: ApplicantDto;
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  
  constructor(
    injector: Injector,
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService,
    private _applicantService: ApplicantServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'sidebar-mini');

    SignalRAspNetCoreHelper.initSignalR();

    abp.event.on('abp.notifications.received', (userNotification) => {
      abp.notifications.showUiNotifyForUserNotification(userNotification);

      // Desktop notification
      Push.create('AbpZeroTemplate', {
        body: userNotification.notification.data.message,
        icon: abp.appPath + 'assets/app-logo-small.png',
        timeout: 6000,
        onClick: function () {
          window.focus();
          this.close();
        }
      });
    });


      this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
}
