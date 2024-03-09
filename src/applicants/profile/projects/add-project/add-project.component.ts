import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit
} from '@angular/core';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponentBase } from '@shared/app-component-base';
import { ProjectDto, ProjectServiceProxy } from '@shared/service-proxies/service-proxies';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AddProjectComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  project: ProjectDto;
  projectService: ProjectServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _projectService: ProjectServiceProxy, public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);

    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: [null, Validators.required],
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
      const formData = this.form.value as ProjectDto;
      console.log(formData);

      this._projectService.create(formData).subscribe(
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
