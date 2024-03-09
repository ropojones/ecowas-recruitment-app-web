import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, ProjectServiceProxy, ProjectDto } from '@shared/service-proxies/service-proxies';
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
import { AsyncPipe, CommonModule } from '@angular/common';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, Subscribable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  standalone: true,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule, FormsModule,
    MatFormFieldModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],

})
export class ProjectsComponent extends AppComponentBase implements OnInit {


  id: number;
  applicant: ApplicantDto;
  project = new ProjectDto();
  projects: ProjectDto[] = [];
  userId = this.appSession.userId;

  profileProjects: ProjectDto[];
  applicantProject: ProjectDto;

  

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _projectService: ProjectServiceProxy,
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
      this.getProjects();
    });
  }

  //Add user project
  addProject(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: this.applicant.id,
      height: '65%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProjects();
    });
  }

  //Get user project
  getProjects(): void {
    this._projectService.getProjectByApplicant(this.id).subscribe((result) => {
      this.projects = result;
      console.log(this.projects);
      this.profileProjects = this.projects;

    });
  }

  //Update user project
  editProject(project: ProjectDto): void {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: project,
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProjects()
    });
  }

  //Delete user project
  deleteProject(project: ProjectDto): void {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: project,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProjects()
    });
  }




}