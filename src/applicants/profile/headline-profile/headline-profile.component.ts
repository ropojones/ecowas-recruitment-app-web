import { Component, Injector, ChangeDetectionStrategy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { ApplicantDto, ApplicantServiceProxy } from '@shared/service-proxies/service-proxies';
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from '@angular/common';
@Component({
    standalone: true,
    selector: 'app-headline-profile',
    templateUrl: './headline-profile.component.html',
    styleUrl: './headline-profile.component.css',
    animations: [appModuleAnimation()],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [SharedModule, CommonModule]
})
export class HeadlineProfileComponent extends AppComponentBase  {
  
  id: number;
  applicant: ApplicantDto; 
  userId = this.appSession.userId;
  
  firstname: string;
  lastname: string;
  middlename: string;
  headline: string;
  experience: number
  country: string;
  email: string;
  phone: string;
  dateofbirth: any;

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.getProfile(this.userId);
  }
  getProfile(userid: number): void {
    this._applicantService.getApplicantUserId(this.userId).subscribe((result) => {
      this.applicant = result;
      this.firstname = this.applicant.firstName;
      this.middlename = this.applicant.middleName;
      this.lastname = this.applicant.lastName;
      this.headline = this.applicant.headline;
      this.experience = this.applicant.yearsOfExperience;
      this.email = this.applicant.email;
      this.phone = this.applicant.phone;
      this.dateofbirth = this.applicant.dateOfBirth;
      this.country = this.applicant.country;
      console.log(this.applicant);


    });
   
  }
 
}
