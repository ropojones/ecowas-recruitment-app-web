import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, TrainingServiceProxy, TrainingDto } from '@shared/service-proxies/service-proxies';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog, MatDialogModule,
} from '@angular/material/dialog';
import { SharedModule } from "../../../shared/shared.module";
import { Router } from '@angular/router';
import { AddTrainingComponent } from '../training/add-training/add-training.component';
import { MatListModule } from '@angular/material/list';
import { ScoreProfileComponent } from '../score-profile/score-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { appModuleAnimation } from '@shared/animations/routerTransition'
import { CommonModule } from '@angular/common';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { DeleteTrainingComponent } from './delete-training/delete-training.component';

@Component({
  standalone: true,
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule],

})
export class TrainingComponent extends AppComponentBase implements OnInit {

  id: number;
  applicant: ApplicantDto;
  training = new TrainingDto();
  trainings: TrainingDto[] = [];
  userId = this.appSession.userId;

  
  profileTrainings: TrainingDto[];
  applicantTraining: TrainingDto;

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _trainingService: TrainingServiceProxy,
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
      this.getTrainings();
    });
  }

  //Add user training
  addTraining(): void {
    const dialogRef = this.dialog.open(AddTrainingComponent, {
      data: this.applicant.id,
      height: '65%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTrainings();
    });
  }

  //Get user training
  getTrainings(): void {
    this._trainingService.getTrainingByApplicant(this.id).subscribe((result) => {
      this.trainings = result;
      console.log(this.trainings);
      this.profileTrainings = this.trainings;
    });
  }

  //Update user training
  editTraining(training: TrainingDto): void {
    const dialogRef = this.dialog.open(EditTrainingComponent, {
      data: training,
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTrainings()
    });
  }

  //Delete user training
  deleteTraining(training: TrainingDto): void {
    const dialogRef = this.dialog.open(DeleteTrainingComponent, {
      data: training,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTrainings()
    });
  }
}