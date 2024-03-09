import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, SkillServiceProxy, SkillDto } from '@shared/service-proxies/service-proxies';
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
import { DeleteSkillComponent } from './delete-skill/delete-skill.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, Subscribable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule, FormsModule,
    MatFormFieldModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],

})
export class SkillComponent extends AppComponentBase implements OnInit {


  id: number;
  applicant: ApplicantDto;
  skill = new SkillDto();
  skills: SkillDto[] = [];
  userId = this.appSession.userId;

  profileSkills: SkillDto[];
  applicantSkill: SkillDto;

  

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _skillService: SkillServiceProxy,
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
      this.getSkills();
    });
  }

  //Add user skill
  addSkill(): void {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      data: this.applicant.id,
      height: '65%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSkills();
    });
  }

  //Get user skill
  getSkills(): void {
    this._skillService.getSkillByApplicant(this.id).subscribe((result) => {
      this.skills = result;
      console.log(this.skills);
      this.profileSkills = this.skills;

    });
  }

  //Update user skill
  editSkill(skill: SkillDto): void {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      data: skill,
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSkills()
    });
  }

  //Delete user skill
  deleteSkill(skill: SkillDto): void {
    const dialogRef = this.dialog.open(DeleteSkillComponent, {
      data: skill,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSkills()
    });
  }




}