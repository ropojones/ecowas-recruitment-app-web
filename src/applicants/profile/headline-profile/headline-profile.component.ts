import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ApplicantDto, ApplicantServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-headline-profile',
  templateUrl: './headline-profile.component.html',
  styleUrl: './headline-profile.component.css',
  animations: [appModuleAnimation()]
})
export class HeadlineProfileComponent extends AppComponentBase {
  applicant = new ApplicantDto();
  id = this.appSession.userId;
  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy
  ) {
    super(injector)
  }

  ngOnInit() {
    this._applicantService.getApplicantUserId(this.id).subscribe((result) => {
      if (result != null) {
        this.applicant = result;
      }
    });

  }

}
