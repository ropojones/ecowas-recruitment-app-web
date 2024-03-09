import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, ExperienceServiceProxy, ExperienceDto, CertificateAwardedDto, CertificateAwardedServiceProxy } from '@shared/service-proxies/service-proxies';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog, MatDialogModule,
} from '@angular/material/dialog';
import { SharedModule } from "../../../shared/shared.module";
import { Router } from '@angular/router'; 
import { MatListModule } from '@angular/material/list';
import { ScoreProfileComponent } from '../score-profile/score-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { appModuleAnimation } from '@shared/animations/routerTransition'
import { CommonModule } from '@angular/common'; 
import { AddCertificateAwardedComponent } from './add-certificate-awarded/add-certificate-awarded.component';
import { EditCertificateAwardedComponent } from './edit-certificate-awarded/edit-certificate-awarded.component';
import { DeleteCertificateAwardedComponent } from './delete-certificate-awarded/delete-certificate-awarded.component';


@Component({
  standalone: true,
  selector: 'app-certificates-awarded',
  templateUrl: './certificates-awarded.component.html',
  styleUrl: './certificates-awarded.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule],

})

export class CertificatesAwardedComponent extends AppComponentBase implements OnInit {

  id: number;
  applicant: ApplicantDto;
  certificateawarded = new CertificateAwardedDto();
  certificateawardeds: CertificateAwardedDto[] = [];
  userId = this.appSession.userId;

  profileAboutme: string;
  profileCertificateAwards: CertificateAwardedDto[];
  applicantCertificateAwarded: CertificateAwardedDto;

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _certificateawardedService: CertificateAwardedServiceProxy,
    private _modalService: BsModalService,
    public dialog: MatDialog,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getProfile();
  }

  //Return to profile page
  goBack() {
    this.router.navigate(['/applicants/profile']);
  }

  //Get user profile
  getProfile(): void {
    this._applicantService.getApplicantUserId(this.userId).subscribe((result) => {
      this.applicant = result;
      console.log(this.applicant);
      this.id = this.applicant.id;
      this.getCertificateAwardeds();
    });
  }

  //Add user certificateawarded
  addCertificateAwarded(): void {
    const dialogRef = this.dialog.open(AddCertificateAwardedComponent, {
      data: this.applicant.id,
      height: '80%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCertificateAwardeds();
    });
  }

  //Get user certificateawarded
  getCertificateAwardeds(): void {
    this._certificateawardedService.getCertficateAwardedByApplicant(this.id).subscribe((result) => {
      this.certificateawardeds = result;
      console.log(this.certificateawardeds);
      this.profileCertificateAwards = this.certificateawardeds;
    });
  }

  //Update user certificateawarded
  editCertificateAwarded(certificateawarded: ExperienceDto): void {
    const dialogRef = this.dialog.open(EditCertificateAwardedComponent, {
      data: certificateawarded,
      height: '80%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCertificateAwardeds()
    });
  }

  //Delete user certificateawarded
  deleteCertificateAwarded(certificateawarded: ExperienceDto): void {
    const dialogRef = this.dialog.open(DeleteCertificateAwardedComponent, {
      data: certificateawarded,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCertificateAwardeds()
    });
  }
}