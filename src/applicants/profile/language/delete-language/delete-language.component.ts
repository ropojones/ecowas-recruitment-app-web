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
import { LanguageDto, LanguageServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-delete-language',
  templateUrl: './delete-language.component.html',
  styleUrl: './delete-language.component.css'
})
export class DeleteLanguageComponent  extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  language: LanguageDto;
  languageService: LanguageServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _languageService: LanguageServiceProxy, public dialogRef: MatDialogRef<DeleteLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);
    this.form = this.fb.group({
      id: [null],
      language: ['', Validators.required],
      description: ['', Validators.required],   
      applicantId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id,
      language: ['', Validators.required],
      description: ['', Validators.required],
      applicantId: [null, Validators.required]
  });
  }

  onSubmit() {

    if (this.form.valid) {
      const formData = this.form.value as LanguageDto;
      this._languageService.delete(formData.id).subscribe(
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
