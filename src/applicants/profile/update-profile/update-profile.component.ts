import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  Inject
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ApplicantServiceProxy,
  CreateApplicantDto,
  ApplicantDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { MaterialModule } from 'material/material.module';
import { NgForm } from '@angular/forms';
import { FormGroup, Validators, FormBuilder, FormsModule, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',

})
export class UpdateProfileComponent {

constructor(@Inject(MAT_DIALOG_DATA) public data){
  
}
  onSubmit() {
    throw new Error('Method not implemented.');
  }
}