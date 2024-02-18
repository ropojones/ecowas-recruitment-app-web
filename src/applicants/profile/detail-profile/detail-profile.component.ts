
import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { ApplicantServiceProxy, ApplicantDto, ApplicantDtoPagedResultDto } from '@shared/service-proxies/service-proxies'; 
import { CreateProfileComponent } from '../create-profile/create-profile.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styleUrl: './detail-profile.component.css'
})
export class DetailProfileComponent extends AppComponentBase {

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  
  createApplicant(): void {
    this.showCreateOrEditApplicantDialog();
  }

  editApplicant(applicant: ApplicantDto): void {
    this.showCreateOrEditApplicantDialog(applicant.id);
  }


  protected delete(applicant: ApplicantDto): void {
    abp.message.confirm(
      this.l('ApplicantDeleteWarningMessage', applicant.firstName.toString() + " " + applicant.lastName.toString()),
      undefined,
      (result: boolean) => {
        if (result) {
          this._applicantService.delete(applicant.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            //this.refresh();
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
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditApplicantDialog = this._modalService.show(
        UpdateProfileComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditApplicantDialog.content.onSave.subscribe(() => {
      //this.refresh();
    });
  }
}
