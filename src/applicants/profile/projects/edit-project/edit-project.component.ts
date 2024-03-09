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
import { ProjectDto, ProjectDtoPagedResultDto, ProjectServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditProjectComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  project: ProjectDto;
  projectService: ProjectServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _projectService: ProjectServiceProxy, public dialogRef: MatDialogRef<EditProjectComponent>,
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
      id: this.data.id,
      title: this.data.title,
      description: this.data.description,    
      year: this.data.year,    
      applicantId: this.data.applicantId
    });
 
}

onSubmit() {

  if (this.form.valid) {
    const formData = this.form.value as ProjectDto;
    console.log(formData);

    this._projectService.update(formData).subscribe(
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
