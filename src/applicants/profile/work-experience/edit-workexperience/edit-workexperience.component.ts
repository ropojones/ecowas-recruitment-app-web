import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit
} from '@angular/core';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppComponentBase } from '@shared/app-component-base';
import { ExperienceDto, ExperienceDtoPagedResultDto, ExperienceServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-edit-workexperience',
  templateUrl: './edit-workexperience.component.html',
  styleUrl: './edit-workexperience.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditWorkExperienceComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  experience: ExperienceDto;
  experienceService: ExperienceServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _experienceService: ExperienceServiceProxy, public dialogRef: MatDialogRef<EditWorkExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);

    this.form = this.fb.group({
      id: [null],
      organization: ['', Validators.required],
      responsibilities: [''],
      jobTitle: ['', Validators.required],
      level: [null],
      function: [null, Validators.required],
      location: [null, Validators.required],
      startMonth: [null, Validators.required],
      startYear: [null, Validators.required],
      endMonth: [null, Validators.required],
      endYear: [null, Validators.required],
      applicantId: [null, Validators.required]
    });

  }
  ngOnInit(): void {
    this.form.patchValue({
        id: this.data.id,
        organization: this.data.organization,      
        jobTitle: this.data.jobTitle,     
        function: this.data.function,
        location: this.data.location,
        startMonth: this.data.startMonth,
        startYear: this.data.startYear,
        endMonth: this.data.endMonth,
        endYear: this.data.endYear,
        applicantId: this.data.applicantId,
    });
 
}

onSubmit() {
  if (this.form.valid) {
    const formData = this.form.value as ExperienceDto;
    console.log(formData);

    this._experienceService.update(formData).subscribe(
      () => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.form.reset();
        this.dialogRef.close();
      }
    );

  } else {
    //Mark all fields as touched to trigger validation messages
    this.form.markAllAsTouched();
  }
}

Cancel() {
  this.dialogRef.close();
}

}
