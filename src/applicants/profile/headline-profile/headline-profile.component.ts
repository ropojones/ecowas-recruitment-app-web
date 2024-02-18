import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ApplicantDto, ApplicantServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-headline-profile',
  templateUrl: './headline-profile.component.html',
  styleUrl: './headline-profile.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadlineProfileComponent extends AppComponentBase {
  applicant: ApplicantDto = new ApplicantDto();
  userId = this.appSession.userId;
  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy
  ) {
    super(injector)
  }

  ngOnInit() {
    this.getApplicant(this.userId)
  }

  getApplicant(userid: number): void {
    this._applicantService.getApplicantUserId(userid)
      .subscribe((result) => {
        if (result != null) {
          this.applicant = result;
        }
      });
  }

}
