import { Component, Injector } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from '@angular/common';
import { ApplicantDto, ApplicantServiceProxy, CertificateAwardedDto, CertificateAwardedServiceProxy, CoverLetterDto, CoverLetterServiceProxy, EducationDto, EducationServiceProxy, ExperienceDto, ExperienceServiceProxy, LanguageDto, LanguageServiceProxy, ProjectDto, ProjectServiceProxy, SkillDto, SkillServiceProxy, TrainingDto, TrainingServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { AddCertificateAwardedComponent } from '../certificates-awarded/add-certificate-awarded/add-certificate-awarded.component';
import { AddCoverLetterComponent } from '../cover-letters/add-cover-letter/add-cover-letter.component';
import { AddEducationComponent } from '../education/add-education/add-education.component';
import { AddLanguageComponent } from '../language/add-language/add-language.component';
import { AddProjectComponent } from '../projects/add-project/add-project.component';
import { AddSkillComponent } from '../skills/add-skill/add-skill.component';
import { AddTrainingComponent } from '../training/add-training/add-training.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { AddWorkExperienceComponent } from '../work-experience/add-workexperience/add-workexperience.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  standalone: true,
  selector: 'app-score-profile',
  templateUrl: './score-profile.component.html',
  styleUrl: './score-profile.component.css',
  imports: [MatCardModule, MatListModule, MatIconModule, SharedModule, CommonModule]
})
export class ScoreProfileComponent extends AppComponentBase {

  total = 0;
  firstname: string;
  lastname: string;
  middlename: string;
  headline: string;
  experience: number
  country: string;
  email: string;
  phone: string;
  dateofbirth: any;

  id: number;
  applicant: ApplicantDto;
  qualifications: EducationDto[] = [];
  experiences: ExperienceDto[] = [];
  certificateawardeds: CertificateAwardedDto[] = [];
  trainings: TrainingDto[] = [];
  skills: SkillDto[] = [];
  languages: LanguageDto[] = [];
  projects: ProjectDto[] = [];
  coverletters: CoverLetterDto[] = [];
  userId = this.appSession.userId;

  profileAboutme: string;
  profileQualifications: EducationDto[];
  profileExperiences: ExperienceDto[];
  profileCertificateAwardeds: CertificateAwardedDto[];
  profileTrainings: TrainingDto[];
  profileSkills: SkillDto[];
  profileLanguages: LanguageDto[];
  profileProjects: ProjectDto[];
  profileCoverLetters: CoverLetterDto[];
  scoreabout: number;
  scoreheadline: number;
  scoreducation: number;
  scoreexperience: number;
  scorecertifcates: number;
  scoretraining: number;
  scoreskills: number;
  scorelanguage: number;
  scoreproject: any;
  scorecoverletter: number;
  scorecertificates: number;

  constructor(
    injector: Injector,
    private _applicantService: ApplicantServiceProxy,
    private _educationService: EducationServiceProxy,
    private _experienceService: ExperienceServiceProxy,
    private _certificareAwardedService: CertificateAwardedServiceProxy,
    private _trainingService: TrainingServiceProxy,
    private _skillService: SkillServiceProxy,
    private _languageService: LanguageServiceProxy,
    private _projectService: ProjectServiceProxy,
    private _coverLetterService: CoverLetterServiceProxy,
    private _modalService: BsModalService,
    public dialog: MatDialog,
    private router: Router
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.getProfile();
    this.computeScore();

  }

  computeScore(): void {

    this.total = this.scoreexperience;


    // if (this.profileQualifications.length > 0) {
    //   this.total = this.total + this.scoreducation;
    // }
    // if (this.profileCertificateAwardeds.length > 0) {
    //   this.total = this.total + this.scorecertifcates;
    // }

    // if (this.profileTrainings.length > 0) {
    //   this.total = this.total + this.scoretraining;
    // }

    // if (this.profileSkills.length > 0) {
    //   this.total = this.total + this.scoreskills;
    // }

    // if (this.profileLanguages.length > 0) {
    //   this.total = this.total + this.scorelanguage;
    // }

    // if (this.profileProjects.length > 0) {
    //   this.total = this.total + this.scoreproject;
    // }

    // if (this.profileCoverLetters .length > 0) {
    //   this.total = this.total + this.scorecoverletter;
    // }

  }

  getProfile(): void {
    this._applicantService.getApplicantUserId(this.userId).subscribe((result) => {
      this.applicant = result;
      console.log(this.applicant);
      this.profileAboutme = this.applicant.aboutMe;
      this.id = this.applicant.id;
      this.getAcademicQualitifications();
      this.getWorkExperiences();
      this.getCertificateAwardeds();
      this.getTrainings();
      this.getSkills();
      this.getLanguages();
      this.getProjects();
      this.getCoverLetters();
      
    });
    
  }
  updateProfile(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: this.applicant,
      height: '70%',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();
      window.location.reload();
    });
  }

  // Work Experience
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

  getWorkExperiences(): void {
    this._experienceService.getExperienceByApplicant(this.id).subscribe((result) => {
      this.experiences = result;
      console.log(this.experiences);
      this.profileExperiences = this.experiences;
   

    });
  }
  viewWorkExperience() {
    this.router.navigate(['/applicants/profile/work-experience']);
  }



  // Education
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

  getAcademicQualitifications(): void {
    this._educationService.getEducationByApplicant(this.id).subscribe((result) => {
      this.qualifications = result;
      console.log(this.qualifications);
      this.profileQualifications = this.qualifications;
     
    });
  }
  viewAcademicQualitification() {
    this.router.navigate(['/applicants/profile/education']);
  }

  // Certificate Awarded
  addCertificateAwarded(): void {
    const dialogRef = this.dialog.open(AddCertificateAwardedComponent, {
      data: this.applicant.id,
      height: '65%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCertificateAwardeds();
    });
  }

  getCertificateAwardeds(): void {
    this._certificareAwardedService.getCertficateAwardedByApplicant(this.id).subscribe((result) => {
      this.certificateawardeds = result;
      console.log(this.certificateawardeds);
      this.profileCertificateAwardeds = this.certificateawardeds;
    
    });
  }
  viewCertificateAwarded() {
    this.router.navigate(['/applicants/profile/certificates-awarded']);
  }

  // Training 
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

  getTrainings(): void {
    this._trainingService.getTrainingByApplicant(this.id).subscribe((result) => {
      this.trainings = result;
      console.log(this.trainings);
      this.profileTrainings = this.trainings;
    });
  }
  viewTraining() {
    this.router.navigate(['/applicants/profile/training']);
  }


  // Skill 
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

  getSkills(): void {
    this._skillService.getSkillByApplicant(this.id).subscribe((result) => {
      this.skills = result;
      console.log(this.trainings);
      this.profileSkills = this.skills;
    });
  }
  viewSkills() {
    this.router.navigate(['/applicants/profile/skill']);
  }



  // Language 
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

  getLanguages(): void {
    this._languageService.getLanguageByApplicant(this.id).subscribe((result) => {
      this.languages = result;
      console.log(this.languages);
      this.profileLanguages = this.languages;
    });
  }
  viewLanguages() {
    this.router.navigate(['/applicants/profile/language']);
  }



  // Project 
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

  getProjects(): void {
    this._projectService.getProjectByApplicant(this.id).subscribe((result) => {
      this.projects = result;
      console.log(this.projects);
      this.profileProjects = this.projects;
    });
  }
  viewProjects() {
    this.router.navigate(['/applicants/profile/project']);
  }


  // Cover Letter 
  addCoverLetter(): void {
    const dialogRef = this.dialog.open(AddCoverLetterComponent, {
      data: this.applicant.id,
      height: '80%',
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProjects();
    });
  }

  getCoverLetters(): void {
    this._coverLetterService.getCoverLetterByApplicant(this.id).subscribe((result) => {
      this.coverletters = result;
      console.log(this.coverletters);
      this.profileCoverLetters = this.coverletters;
    });
  }
  viewCoverLetters() {
    this.router.navigate(['/applicants/profile/cover-letter']);
  }

}
