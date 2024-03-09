import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantServiceProxy, ApplicantDto, LanguageServiceProxy, LanguageDto } from '@shared/service-proxies/service-proxies';
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
import { DeleteLanguageComponent } from './delete-language/delete-language.component';
import { EditLanguageComponent } from './edit-language/edit-language.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  standalone: true,  
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, ScoreProfileComponent, SharedModule, MatListModule, MatIconModule, MatCardModule, MatButtonModule, MatDialogModule, MatCheckboxModule],

})
export class LanguageComponent extends AppComponentBase implements OnInit {


  id: number;
  applicant: ApplicantDto;
  language = new LanguageDto();
  languages: LanguageDto[] = [];
  userId = this.appSession.userId;

  profileLanguages: LanguageDto[];
  applicantLanguage: LanguageDto;

  

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _languageService: LanguageServiceProxy,
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
      this.getLanguages();
    });
  }

  //Add user language
  addLanguage(): void {
    const dialogRef = this.dialog.open(AddLanguageComponent, {
      data: this.applicant.id,
      height: '65%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLanguages();
    });
  }

  //Get user language
  getLanguages(): void {
    this._languageService.getLanguageByApplicant(this.id).subscribe((result) => {
      this.languages = result;
      console.log(this.languages);
      this.profileLanguages = this.languages;

    });
  }

  //Update user language
  editLanguage(language: LanguageDto): void {
    const dialogRef = this.dialog.open(EditLanguageComponent, {
      data: language,
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLanguages()
    });
  }

  //Delete user language
  deleteLanguage(language: LanguageDto): void {
    const dialogRef = this.dialog.open(DeleteLanguageComponent, {
      data: language,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLanguages()
    });
  }




}