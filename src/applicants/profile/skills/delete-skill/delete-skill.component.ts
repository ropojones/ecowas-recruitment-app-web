

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
import { SkillDto, SkillServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-delete-skill',
  templateUrl: './delete-skill.component.html',
  styleUrl: './delete-skill.component.css'
})
export class DeleteSkillComponent  extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  skill: SkillDto;
  skillService: SkillServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _skillService: SkillServiceProxy, public dialogRef: MatDialogRef<DeleteSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder) {

    super(injector);
    this.form = this.fb.group({
      id: [null],
      skill: ['', Validators.required],
      description: ['', Validators.required],   
      applicantId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id,
      skill: ['', Validators.required],
      description: ['', Validators.required],
      applicantId: [null, Validators.required]
  });
  }

  onSubmit() {

    if (this.form.valid) {
      const formData = this.form.value as SkillDto;
      this._skillService.delete(formData.id).subscribe(
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
