
import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto } from '@shared/service-proxies/service-proxies';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import {
  MatDialog,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from "../../../shared/shared.module";

@Component({
    standalone: true,
    selector: 'app-detail-profile',
    templateUrl: './detail-profile.component.html',
    styleUrl: './detail-profile.component.css',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardHeader, MatCardSubtitle, SharedModule]
})
export class DetailProfileComponent extends AppComponentBase {
  id: number;
  applicant: ApplicantDto;
  applicantService: ApplicantServiceProxy;
  userId = this.appSession.userId;
  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _modalService: BsModalService,
    public dialog: MatDialog
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this._applicantService.getApplicantUserId(this.userId).subscribe((result) => {
      this.applicant = result;
    });
  }

  updateProfile(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: this.applicant,
      height: '50%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
