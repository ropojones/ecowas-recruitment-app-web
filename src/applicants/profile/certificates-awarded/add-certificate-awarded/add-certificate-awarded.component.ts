


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
import { CertificateAwardedDto, CertificateAwardedServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-add-certificate-awarded',
  templateUrl: './add-certificate-awarded.component.html',
  styleUrl: './add-certificate-awarded.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddCertificateAwardedComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  certificateawarded: CertificateAwardedDto;
  certificateawardedService: CertificateAwardedServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _certificateawardedService: CertificateAwardedServiceProxy, public dialogRef: MatDialogRef<AddCertificateAwardedComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);

    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      type: ['', Validators.required],
      yearReceived: ['', Validators.required],
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
    const formData = this.form.value as CertificateAwardedDto;
    console.log(formData);

    this._certificateawardedService.create(formData).subscribe(
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
