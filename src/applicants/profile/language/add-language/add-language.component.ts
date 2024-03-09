import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit
} from '@angular/core';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponentBase } from '@shared/app-component-base';
import { LanguageDto, LanguageDtoPagedResultDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddLanguageComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  language: LanguageDto;
  languageService: LanguageServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _languageService: LanguageServiceProxy, public dialogRef: MatDialogRef<AddLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);

    this.form = this.fb.group({
      id: [null],
      language: ['', Validators.required],
      speakingProficiency: [false,[]],
      writtingProficiency: [false, []],
      readingProficiency: [false,[]],
      understandingProficiency: [false, []],
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
    const formData = this.form.value as LanguageDto;
    console.log(formData);

    this._languageService.create(formData).subscribe(
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
