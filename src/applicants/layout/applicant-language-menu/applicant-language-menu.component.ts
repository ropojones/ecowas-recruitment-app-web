import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  ChangeUserLanguageDto
} from '@shared/service-proxies/service-proxies';
import { filter as _filter } from 'lodash-es';
@Component({
  selector: 'app-applicant-language-menu',
  templateUrl: './applicant-language-menu.component.html',
  styleUrl: './applicant-language-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantLanguageMenuComponent extends AppComponentBase
implements OnInit {
languages: abp.localization.ILanguageInfo[];
currentLanguage: abp.localization.ILanguageInfo;

constructor(injector: Injector, private _userService: UserServiceProxy) {
  super(injector);
}

ngOnInit() {
  this.languages = _filter(
    this.localization.languages,
    (l) => !l.isDisabled
  );
  this.currentLanguage = this.localization.currentLanguage;
}

changeLanguage(languageName: string): void {
  const input = new ChangeUserLanguageDto();
  input.languageName = languageName;

  this._userService.changeLanguage(input).subscribe(() => {
    abp.utils.setCookieValue(
      'Abp.Localization.CultureName',
      languageName,
      new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
      abp.appPath
    );

    window.location.reload();
  });
}
}
