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
import { TrainingDto, TrainingDtoPagedResultDto, TrainingServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrl: './edit-training.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditTrainingComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  training: TrainingDto;
  trainingService: TrainingServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _trainingService: TrainingServiceProxy, public dialogRef: MatDialogRef<EditTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);

    this.form = this.fb.group({
      id: [null],
      organization: ['', Validators.required],
      title: ['', Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],    
      applicantId: [null, Validators.required]
    });

  }
  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id,
      organization: this.data.organization,
      title: this.data.title,
      month: this.data.month,
      year: this.data.year,     
      applicantId: this.data.applicantId
    });
 
}

onSubmit() {

  if (this.form.valid) {
    const formData = this.form.value as TrainingDto;
    console.log(formData);

    this._trainingService.update(formData).subscribe(
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
