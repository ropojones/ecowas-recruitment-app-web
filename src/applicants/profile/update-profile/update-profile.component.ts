import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  forwardRef,
  Inject
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map, result } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ApplicantServiceProxy,
  ApplicantDto
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ControlValueAccessor, ReactiveFormsModule, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MaterialModule } from 'material/material.module';

import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatOptgroup } from '@angular/material/core';
@Component({
  standalone: true,
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
  imports: [MatCardModule, MatError,  ReactiveFormsModule, MatFormFieldModule, MatOptgroup]
})
export class UpdateProfileComponent extends AppComponentBase implements OnInit {
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  saving = false;
  applicant = new ApplicantDto();
  id: number;
  applicantProfileFg: FormGroup ;

  constructor(private fb: FormBuilder, injector: Injector,
    public _applicantService: ApplicantServiceProxy,
    public bsModalRef: BsModalRef,
    @Inject(MAT_DIALOG_DATA) public data: {}) {
    super(injector);

    this.applicantProfileFg = this.fb.group({
      id: [null],
      applicantNumber: [null],
      headline: [null],
      yearsOfExperience: [null, Validators.required],
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
      courseOfStudy: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      userId: [null],
      isEcowas: [null],
      isEcowasVerified: [null]
    });
    //close contructor
  }


  ngOnInit(): void {
    // this._applicantService.getApplicant(this.id).subscribe((result) => {
    //   this.applicant = result;

    // });
  }

 
}
