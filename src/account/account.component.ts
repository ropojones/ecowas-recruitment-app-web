import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Renderer2
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AccountPageService } from './account.service';

@Component({
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  encapsulation: ViewEncapsulation.None,
  providers:[AccountPageService]
})
export class AccountComponent extends AppComponentBase implements OnInit {
  data: string;
  constructor(injector: Injector, private renderer: Renderer2, private service: AccountPageService) {
    super(injector);
  }

  showTenantChange(): boolean {
    return abp.multiTenancy.isEnabled;
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login-page');
  }
}
