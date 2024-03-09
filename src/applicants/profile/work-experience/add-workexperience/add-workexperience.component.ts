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
import { EditorModule,  TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-add-workexperience',
  templateUrl: './add-workexperience.component.html',
  styleUrl: './add-workexperience.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AddWorkExperienceComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  experience: ExperienceDto;
  experienceService: ExperienceServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _experienceService: ExperienceServiceProxy, public dialogRef: MatDialogRef<AddWorkExperienceComponent>,
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
      applicantId: this.data,
    });
  }

  onSubmit() {
     if (this.form.valid) {
      const formData = this.form.value as ExperienceDto;
      console.log(formData);

      this._experienceService.create(formData).subscribe(
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
