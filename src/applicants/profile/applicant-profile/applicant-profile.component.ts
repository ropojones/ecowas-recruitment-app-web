import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ApplicantDto, ApplicantServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrl: './applicant-profile.component.css'
})
export class ApplicantProfileComponent extends AppComponentBase implements OnInit {
  applicant = new ApplicantDto();
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    
  }
}
