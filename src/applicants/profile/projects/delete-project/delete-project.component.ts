import {
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

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.css'
})
export class DeleteProjectComponent  extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  project: ProjectDto;
  projectService: ProjectServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _projectService: ProjectServiceProxy, public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);
    this.form = this.fb.group({
      id: [null],
      project: ['', Validators.required],
      description: ['', Validators.required],   
      applicantId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id,
      project: ['', Validators.required],
      description: ['', Validators.required],
      applicantId: [null, Validators.required]
  });
  }

  onSubmit() {

    if (this.form.valid) {
      const formData = this.form.value as ProjectDto;
      this._projectService.delete(formData.id).subscribe(
        () => {
          this.notify.success(this.l('SuccessfullyDeleted'));
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
