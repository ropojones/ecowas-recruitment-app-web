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
import { EducationDto, EducationDtoPagedResultDto, EducationServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddEducationComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  education: EducationDto;
  educationService: EducationServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _educationService: EducationServiceProxy, public dialogRef: MatDialogRef<AddEducationComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);

    this.form = this.fb.group({
      id: [null],
      institution: ['', Validators.required],
      course: ['', Validators.required],
      certificateAwarded: ['', Validators.required],
      startMonth: [null, Validators.required],
      startYear: [null, Validators.required],
      endMonth: [null, Validators.required],
      endYear: [null, Validators.required],
      applicantId: [null, Validators.required]
    });

  }
  ngOnInit(): void {
    this.form.patchValue({
      applicantId: this.data,
    });
 
}

onSubmit() {

  if (this.form.valid) {
    const formData = this.form.value as EducationDto;
    console.log(formData);

    this._educationService.create(formData).subscribe(
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
