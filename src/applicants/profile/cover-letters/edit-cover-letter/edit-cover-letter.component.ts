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
import { CoverLetterDto, CoverLetterDtoPagedResultDto, CoverLetterServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-edit-cover-letter',
  templateUrl: './edit-cover-letter.component.html',
  styleUrl: './edit-cover-letter.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditCoverLetterComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  coverletter: CoverLetterDto;
  coverletterService: CoverLetterServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _coverletterService: CoverLetterServiceProxy, public dialogRef: MatDialogRef<EditCoverLetterComponent>,
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
      title: this.data.title,
      letter: this.data.letter,    
      applicantId: this.data.applicantId
    });
 
}

onSubmit() {

  if (this.form.valid) {
    const formData = this.form.value as CoverLetterDto;
    console.log(formData);

    this._coverletterService.update(formData).subscribe(
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
