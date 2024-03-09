import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, CoverLetterServiceProxy, CoverLetterDto } from '@shared/service-proxies/service-proxies';
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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, Subscribable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AddCoverLetterComponent } from './add-cover-letter/add-cover-letter.component';
import { DeleteCoverLetterComponent } from './delete-cover-letter/delete-cover-letter.component';
import { EditCoverLetterComponent } from './edit-cover-letter/edit-cover-letter.component';


@Component({
  standalone: true,
  selector: 'app-cover-letters',
  templateUrl: './cover-letters.component.html',
  styleUrl: './cover-letters.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule, FormsModule,
    MatFormFieldModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],

})
export class CoverLetterComponent extends AppComponentBase implements OnInit {


  id: number;
  applicant: ApplicantDto;
  coverletter = new CoverLetterDto();
  coverletters: CoverLetterDto[] = [];
  userId = this.appSession.userId;

  profileCoverLetters: CoverLetterDto[];
  applicantCoverLetter: CoverLetterDto;

  

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _coverletterService: CoverLetterServiceProxy,
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
      this.getCoverLetters();
    });
  }

  //Add user coverletter
  addCoverLetter(): void {
    const dialogRef = this.dialog.open(AddCoverLetterComponent, {
      data: this.applicant.id,
      height: '65%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCoverLetters();
    });
  }

  //Get user coverletter
  getCoverLetters(): void {
    this._coverletterService.getCoverLetterByApplicant(this.id).subscribe((result) => {
      this.coverletters = result;
      console.log(this.coverletters);
      this.profileCoverLetters = this.coverletters;

    });
  }

  //Update user coverletter
  editCoverLetter(coverletter: CoverLetterDto): void {
    const dialogRef = this.dialog.open(EditCoverLetterComponent, {
      data: coverletter,
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCoverLetters()
    });
  }

  //Delete user coverletter
  deleteCoverLetter(coverletter: CoverLetterDto): void {
    const dialogRef = this.dialog.open(DeleteCoverLetterComponent, {
      data: coverletter,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCoverLetters()
    });
  }




}