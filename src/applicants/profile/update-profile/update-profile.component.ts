import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit
} from '@angular/core';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicantDto, ApplicantServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})

export class UpdateProfileComponent extends AppComponentBase implements OnInit {
  form: FormGroup;
  id: number;
  applicant: ApplicantDto;
  applicantService: ApplicantServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _applicantService: ApplicantServiceProxy, public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);
    this.form = this.fb.group({
      id: [null],
      applicantNumber: [null],
      headline: [null],
      yearsOfExperience: [null],
      aboutMe: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      middleName: [null],
      dateOfBirth: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null],
      phone: [null, Validators.required],
      alternatePhone: [null],
      address: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      educationLevel: [null, Validators.required],
      courseOfStudy: [null],
      country: [null, Validators.required],
      state: [null],
      userId: [null],
      isEcowas: [null],
      isEcowasVerified: [null],
      ecowasInstitution: [null]

    });

  }
  ngOnInit(): void {
    var fixdate: string;
    if (this.data.dateOfBirth == null){
      fixdate = null;
    }
    else{
      fixdate = new Date(this.data.dateOfBirth).toISOString().substring(0, 10);
    }
    this.form.patchValue({
      id: this.data.id,
      applicantNumber: this.data.applicantNumber,
      headline: this.data.headline,
      yearsOfExperience: this.data.yearsOfExperience,
      aboutMe: this.data.aboutMe,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      middleName: this.data.middleName,
      dateOfBirth: fixdate,
      gender: this.data.gender,
      age: this.data.age,
      phone: this.data.phone,
      alternatePhone: this.data.alternatePhone,
      address: this.data.address,
      email: this.data.email,
      educationLevel: this.data.educationLevel,
      courseOfStudy: this.data.courseOfStudy,
      country: this.data.country,
      state: this.data.state,
      userId: this.data.userId,
      isEcowas: this.data.isEcowas,
      isEcowasVerified: this.data.isEcowasVerified,
      ecowasInstitution: this.data.ecowasInstitution
    })

  }

  onSubmit() {

    if (this.form.valid) {
      const formData = this.form.value as ApplicantDto;
      console.log(formData);
      this._applicantService.update(formData).subscribe(
        () => {
          this.notify.success(this.l('SavedSuccessfully'));
          this.dialogRef.close();
        }
      );
      
    } else {
      //Mark all fields as touched to trigger validation messages
      this.form.markAllAsTouched();
    }
  }

}