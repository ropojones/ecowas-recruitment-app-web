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
import { SkillDto, SkillDtoPagedResultDto, SkillServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrl: './edit-skill.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditSkillComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  id: number;
  skill: SkillDto;
  skillService: SkillServiceProxy;
  userId = this.appSession.userId;


  constructor(injector: Injector, private _skillService: SkillServiceProxy, public dialogRef: MatDialogRef<EditSkillComponent>,
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
      skill: this.data.skill,
      description: this.data.description,    
      applicantId: this.data.applicantId
    });
 
}

onSubmit() {

  if (this.form.valid) {
    const formData = this.form.value as SkillDto;
    console.log(formData);

    this._skillService.update(formData).subscribe(
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
