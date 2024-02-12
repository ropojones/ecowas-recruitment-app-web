import {
  Component,
  OnInit,
  Injector,
  ChangeDetectionStrategy
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { filter as _filter } from 'lodash-es';

@Component({
  selector: 'account-header',
  templateUrl: './account-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountHeaderComponent extends AppComponentBase
implements OnInit {
  languages: abp.localization.ILanguageInfo[];
  currentLanguage: abp.localization.ILanguageInfo;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.languages = _filter(
      this.localization.languages,
      (l) => !l.isDisabled
    );
    this.currentLanguage = this.localization.currentLanguage;
  }
}