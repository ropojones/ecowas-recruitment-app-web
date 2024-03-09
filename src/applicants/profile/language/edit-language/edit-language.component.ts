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
import { LanguageDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrl: './edit-language.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditLanguageComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  language: LanguageDto;
  languageService: LanguageServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _languageService: LanguageServiceProxy, public dialogRef: MatDialogRef<EditLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);

    this.form = this.fb.group({
      id: [null],
      language: ['', Validators.required],
      speakingProficiency: [null],
      writtingProficiency: [null],
      readingProficiency: [null],
      understandingProficiency: [null],
      applicantId: [null, Validators.required]
    });

  }
  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id,
      language: this.data.language,
      speakingProficiency: this.data.speakingProficiency,
      writtingProficiency:this.data.writtingProficiency,
      readingProficiency: this.data.readingProficiency,
      understandingProficiency: this.data.understandingProficiency,
      applicantId: this.data.applicantId
    });

 
}

onSubmit() {

  if (this.form.valid) {
    const formData = this.form.value as LanguageDto;
    console.log(formData);

    this._languageService.update(formData).subscribe(
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
