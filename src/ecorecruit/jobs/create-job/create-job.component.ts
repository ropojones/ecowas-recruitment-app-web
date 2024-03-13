import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { InstitutionDto, InstitutionServiceProxy, JobDto, JobServiceProxy, StationDto, StationServiceProxy } from '@shared/service-proxies/service-proxies';

import { BsModalService } from 'ngx-bootstrap/modal';
import {
  UserServiceProxy
} from '@shared/service-proxies/service-proxies';
import { MatCardModule } from '@angular/material/card';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import * as moment from 'moment';
import { Observable, map } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class CreateJobComponent extends AppComponentBase implements OnInit {

  jobForm: FormGroup;
  jobDto: JobDto;
  institutions: InstitutionDto[];
  stations: StationDto[];
  stepperOrientation: Observable<StepperOrientation>;


  constructor(injector: Injector, private formBuilder: FormBuilder,
    private _userService: UserServiceProxy,
    private _institutionService: InstitutionServiceProxy,
    private _stationService: StationServiceProxy,
    private _jobService: JobServiceProxy,
    private router: Router,
    private activateRouter: ActivatedRoute,
    breakpointObserver: BreakpointObserver,
  ) {
    super(injector);
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }


  ngOnInit(): void {
    this.jobDto = new JobDto();
    this.createForm();
    this.getDutyStations();
    this.getInstitutions();
  }

  getInstitutions(): void {
    this._institutionService.getInstitutionsList().subscribe((result) => {
      this.institutions = result;
      console.log(this.institutions);
    });
  }
  getDutyStations(): void {
    this._stationService.getStationsList().subscribe((result) => {
      this.stations = result;
      console.log(this.stations);
    });
  }


  createForm(): void {
    this.jobForm = this.formBuilder.group({
      title: [this.jobDto.title, Validators.required],
      jobRefNumber: [this.jobDto.jobRefNumber],
      institution: [this.jobDto.institution, Validators.required],
      year: [this.jobDto.year, Validators.required],
      description: [this.jobDto.description, Validators.required],
      type: [this.jobDto.type, Validators.required],
      dutyStation: [this.jobDto.dutyStation, Validators.required],
      applicationDeadline: [moment(this.jobDto.applicationDeadline).toDate(), Validators.required],
      publishStartDate: [moment(this.jobDto.publishStartDate).toDate(), Validators.required],
      publishEndDate: [moment(this.jobDto.publishEndDate).toDate(), Validators.required],
      publishedDate: [moment(this.jobDto.publishedDate).toDate(), Validators.required],
      responsibilities: [this.jobDto.responsibilities],
      keyCompetences: [this.jobDto.keyCompetences, Validators.required],
      requirement: [this.jobDto.requirement, Validators.required],
      directorate: [this.jobDto.directorate, Validators.required],
      department: [this.jobDto.department, Validators.required],
      division: [this.jobDto.division, Validators.required],
      supervisor: [this.jobDto.supervisor, Validators.required],
      annualSalary: [this.jobDto.annualSalary, Validators.required],
      ageLimit: [this.jobDto.ageLimit, Validators.required],
      jobMail: [this.jobDto.jobMail, Validators.required],
      status: [this.jobDto.status, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.jobDto = new JobDto(this.jobForm.value);
      console.log(this.jobDto);
      this._jobService.create(this.jobDto).subscribe(
        (result) => {
          var job = result;
          this.notify.success(this.l('SavedSuccessfully'));
          this.router.navigate(['/ecorecruit/jobs/details', job.id]);
        }
      );
    } else {
    }
  }

  onSubmitAndNew(): void {
    if (this.jobForm.valid) {
      this.jobDto = new JobDto(this.jobForm.value);
      console.log(this.jobDto);
      this._jobService.create(this.jobDto).subscribe(
        (result) => {
          this.notify.success(this.l('SavedSuccessfully'));
          this.jobForm.reset();
          this.jobForm.clearValidators();

        }
      );
    
    } 
    else {

    }
  }





}
