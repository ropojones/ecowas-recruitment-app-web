
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, ExperienceServiceProxy, ExperienceDto } from '@shared/service-proxies/service-proxies';
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
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { DeleteWorkExperienceComponent } from './delete-workexperience/delete-workexperience.component';
import { EditWorkExperienceComponent } from './edit-workexperience/edit-workexperience.component';
import { AddWorkExperienceComponent } from './add-workexperience/add-workexperience.component';


@Component({
  standalone: true,
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule],

})

export class WorkExperienceComponent extends AppComponentBase implements OnInit {

  id: number;
  applicant: ApplicantDto;
  experience = new ExperienceDto();
  experiences: ExperienceDto[] = [];
  userId = this.appSession.userId;

  
  profileExperiences: ExperienceDto[];
  applicantExperience: ExperienceDto;

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _experienceService: ExperienceServiceProxy,
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
      this.getWorkExperiences();
    });
  }

  //Add user experience
  addWorkExperience(): void {
    const dialogRef = this.dialog.open(AddWorkExperienceComponent, {
      data: this.applicant.id,
      height: '80%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getWorkExperiences();
    });
  }

  //Get user experience
  getWorkExperiences(): void {
    this._experienceService.getExperienceByApplicant(this.id).subscribe((result) => {
      this.experiences = result;
      console.log(this.experiences);
      this.profileExperiences = this.experiences;
    });
  }

  //Update user experience
  editWorkExperience(experience: ExperienceDto): void {
    const dialogRef = this.dialog.open(EditWorkExperienceComponent, {
      data: experience,
      height: '80%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getWorkExperiences()
    });
  }

  //Delete user experience
  deleteWorkExperience(experience: ExperienceDto): void {
    const dialogRef = this.dialog.open(DeleteWorkExperienceComponent, {
      data: experience,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getWorkExperiences()
    });
  }
}