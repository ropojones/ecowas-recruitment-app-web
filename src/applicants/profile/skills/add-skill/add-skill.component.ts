
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
import { SkillDto, SkillServiceProxy } from '@shared/service-proxies/service-proxies';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AddSkillComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  skill: SkillDto;
  skillService: SkillServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _skillService: SkillServiceProxy, public dialogRef: MatDialogRef<AddSkillComponent>,
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
      applicantId: this.data,
    });
  }

  onSubmit() {
     if (this.form.valid) {
      const formData = this.form.value as SkillDto;
      console.log(formData);

      this._skillService.create(formData).subscribe(
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
