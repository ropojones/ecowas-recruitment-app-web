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
import { TrainingDto, TrainingServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-delete-training',
  templateUrl: './delete-training.component.html',
  styleUrl: './delete-training.component.css'
})
export class DeleteTrainingComponent  extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  training: TrainingDto;
  trainingService: TrainingServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _trainingService: TrainingServiceProxy, public dialogRef: MatDialogRef<DeleteTrainingComponent>,
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
      this._trainingService.delete(formData.id).subscribe(
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
