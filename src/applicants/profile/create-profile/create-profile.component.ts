
import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
 ApplicantServiceProxy,
  CreateApplicantDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent  extends AppComponentBase
implements OnInit {
saving = false;
applicant = new CreateApplicantDto();
 
@Output() onSave = new EventEmitter<any>();

constructor(
  injector: Injector, 
  public _applicantService:ApplicantServiceProxy,
  public bsModalRef: BsModalRef
) {
  super(injector);
}

ngOnInit(): void {


}

save(): void {
  this.saving = true;

  this._applicantService.create(this.applicant).subscribe(
    () => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    },
    () => {
      this.saving = false;
    }
  );
}
}

