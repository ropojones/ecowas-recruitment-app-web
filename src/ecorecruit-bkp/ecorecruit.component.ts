import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Injector
} from '@angular/core';
import { Router} from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { filter as _filter } from 'lodash-es'; import {
  UserServiceProxy,
  ChangeUserLanguageDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-ecorecruit',
  templateUrl: './ecorecruit.component.html',
  styleUrl: './ecorecruit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EcorecruitComponent extends AppComponentBase implements OnInit {

  languages: abp.localization.ILanguageInfo[];
  currentLanguage: abp.localization.ILanguageInfo;
  currentYear: number;
  versionText: string; 
  constructor(injector: Injector, private _userService: UserServiceProxy, private router: Router    ) {
    super(injector);
    
    this.currentYear = new Date().getFullYear();
    this.versionText =
      this.appSession.application.version +
      ' [' +
      this.appSession.application.releaseDate.format('YYYYDDMM') +
      ']';
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

  getStarted() {
        this.router.navigate(['/ecorecruit/default']);
    }


}
