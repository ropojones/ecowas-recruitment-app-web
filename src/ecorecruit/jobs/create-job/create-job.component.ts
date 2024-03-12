import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit} from '@angular/core';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { InstitutionDto, InstitutionServiceProxy, JobDto, StationDto, StationServiceProxy } from '@shared/service-proxies/service-proxies';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  UserServiceProxy} from '@shared/service-proxies/service-proxies';
import { MatCardModule } from '@angular/material/card';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
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
   
  constructor(injector: Injector, private formBuilder: FormBuilder, 
    private _userService: UserServiceProxy, 
    private _institutionService: InstitutionServiceProxy,
    private _stationService: StationServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }


  ngOnInit(): void {
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
      id: [],
      title: ['', Validators.required],
      jobRefNumber: ['', Validators.required],
      institution: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
      description: ['', Validators.required],
      type: ['', Validators.required],
      dutyStation: ['', Validators.required],
      deadline: ['', Validators.required],
      responsibilities: ['', Validators.required],
      keyCompetences: ['', Validators.required],
      requirement: ['', Validators.required],
      directorate: ['', Validators.required],
      department: ['', Validators.required],
      division: ['', Validators.required],
      supervisor: ['', Validators.required],
      annualSalary: ['', [Validators.required, Validators.min(0)]],
      ageLimit: ['', [Validators.required, Validators.min(0)]],
      jobMail: ['', [Validators.required, Validators.email]],
      status: [false, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {

      // Create a new JobDto instance with form values
      this.jobDto = new JobDto(this.jobForm.value);

      // Now you can use this.jobDto to work with the form data
      console.log(this.jobDto);

    } else {
      // Handle invalid form
    }
  }





}
