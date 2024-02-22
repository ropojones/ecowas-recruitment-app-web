import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedRequestDto } from 'shared/paged-listing-component-base';
import { ApplicantServiceProxy, ApplicantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { ApplicantHeaderComponent } from 'applicants/layout/applicant-header/applicant-header.component';
import {HeadlineProfileComponent} from 'applicants/profile/headline-profile/headline-profile.component';
import { DetailProfileComponent } from './detail-profile/detail-profile.component';
import { ScoreProfileComponent } from './score-profile/score-profile.component';

class PagedApplicantsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}


@Component({
  standalone:true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[HeadlineProfileComponent, DetailProfileComponent, ScoreProfileComponent]

})

export class ProfileComponent extends AppComponentBase{

  userId = this.appSession.userId;
  public applicant = new ApplicantDto();

  constructor(injector: Injector,
              private _applicantService: ApplicantServiceProxy) 
  {
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


