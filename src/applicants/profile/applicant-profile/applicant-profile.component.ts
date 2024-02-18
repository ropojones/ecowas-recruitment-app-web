import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ApplicantDto, ApplicantServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateProfileComponent } from '../create-profile/create-profile.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';


@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrl: './applicant-profile.component.css',
  animations: [appModuleAnimation()]
})

export class ApplicantProfileComponent extends AppComponentBase implements OnInit {
  applicant = new ApplicantDto();
  id = this.appSession.userId;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this._applicantService.getApplicantUserId(this.id).subscribe((result) => {
      if (result != null) {
        this.applicant = result;
      }
    });
  }

  createApplicant(): void {
    this.showCreateOrEditApplicantDialog();
  }

  editApplicant(applicant: ApplicantDto): void {
    this.showCreateOrEditApplicantDialog(applicant.id);
  }

  protected delete(applicant: ApplicantDto): void {
    abp.message.confirm(
      this.l('ApplicantDeleteWarningMessage', applicant.lastName + " " + applicant.firstName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._applicantService.delete(applicant.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }



  private showCreateOrEditApplicantDialog(id?: number): void {
    let createOrEditApplicantDialog: BsModalRef;
    if (!id) {
      createOrEditApplicantDialog = this._modalService.show(
        CreateProfileComponent,
        {
          class: 'modal-xl rounded-0 px-5',
        }
      );
    } else {
      createOrEditApplicantDialog = this._modalService.show(
        UpdateProfileComponent,
        {
          class: 'modal-xl rounded-0 px-5',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditApplicantDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }


  refresh(): void {
    //this.getDataPage(this.pageNumber);
  }
}
