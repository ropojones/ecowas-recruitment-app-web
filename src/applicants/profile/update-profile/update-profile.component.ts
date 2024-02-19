import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ApplicantServiceProxy,
  ApplicantDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent extends AppComponentBase implements OnInit {
  saving = false;
  applicant = new ApplicantDto();  
  id: number;

  @Output() onSave = new EventEmitter<any>();


  constructor(
    injector: Injector,
    public _applicantService: ApplicantServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  save(): void {
    this.saving = true;   
    this._applicantService.update(this.applicant).subscribe(
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
