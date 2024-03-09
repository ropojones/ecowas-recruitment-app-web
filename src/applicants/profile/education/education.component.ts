
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, EducationServiceProxy, EducationDto } from '@shared/service-proxies/service-proxies';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog, MatDialogModule,
} from '@angular/material/dialog';
import { SharedModule } from "../../../shared/shared.module";
import { Router } from '@angular/router';
import { AddEducationComponent } from '../education/add-education/add-education.component';
import { MatListModule } from '@angular/material/list';
import { ScoreProfileComponent } from '../score-profile/score-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { appModuleAnimation } from '@shared/animations/routerTransition'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EditEducationComponent } from './edit-education/edit-education.component';
import { DeleteEducationComponent } from './delete-education/delete-education.component';

@Component({
  standalone: true,
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule],

})
export class EducationComponent extends AppComponentBase implements OnInit {

  id: number;
  applicant: ApplicantDto;
  qualification = new EducationDto();
  qualifications: EducationDto[] = [];
  userId = this.appSession.userId;

  
  profileQualifications: EducationDto[];
  applicantQualification: EducationDto;

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _educationService: EducationServiceProxy,
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
      this.getAcademicQualitifications();
    });
  }

  //Add user qualification
  addAcademicQualitification(): void {
    const dialogRef = this.dialog.open(AddEducationComponent, {
      data: this.applicant.id,
      height: '65%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAcademicQualitifications();
    });
  }

  //Get user qualification
  getAcademicQualitifications(): void {
    this._educationService.getEducationByApplicant(this.id).subscribe((result) => {
      this.qualifications = result;
      console.log(this.qualifications);
      this.profileQualifications = this.qualifications;
    });
  }

  //Update user qualification
  editQualification(qualification: EducationDto): void {
    const dialogRef = this.dialog.open(EditEducationComponent, {
      data: qualification,
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAcademicQualitifications()
    });
  }

  //Delete user qualification
  deleteQualification(qualification: EducationDto): void {
    const dialogRef = this.dialog.open(DeleteEducationComponent, {
      data: qualification,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAcademicQualitifications()
    });
  }
}