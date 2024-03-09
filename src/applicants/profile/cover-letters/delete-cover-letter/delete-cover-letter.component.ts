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
import { CoverLetterDto, CoverLetterServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-delete-cover-letter',
  templateUrl: './delete-cover-letter.component.html',
  styleUrl: './delete-cover-letter.component.css'
})
export class DeleteCoverLetterComponent  extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  coverletter: CoverLetterDto;
  coverletterService: CoverLetterServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _coverletterService: CoverLetterServiceProxy, public dialogRef: MatDialogRef<DeleteCoverLetterComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      letter: ['', Validators.required],   
      applicantId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id,
      title: ['', Validators.required],
      letter: ['', Validators.required],
      applicantId: [null, Validators.required]
  });
  }

  onSubmit() {

    if (this.form.valid) {
      const formData = this.form.value as CoverLetterDto;
      this._coverletterService.delete(formData.id).subscribe(
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
