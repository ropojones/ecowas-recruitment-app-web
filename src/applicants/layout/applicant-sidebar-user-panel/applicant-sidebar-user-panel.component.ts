import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';


@Component({
  selector: 'app-applicant-sidebar-user-panel',
  templateUrl: './applicant-sidebar-user-panel.component.html',
  styleUrl: './applicant-sidebar-user-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApplicantSidebarUserPanelComponent extends AppComponentBase
  implements OnInit {
  shownLoginName = '';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.shownLoginName = this.appSession.getShownLoginName();
  }
}
