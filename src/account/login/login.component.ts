import { Component, Injector, Output, EventEmitter, Renderer2 } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';


@Component({
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css',
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  
  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService,
    private renderer: Renderer2, 
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.renderer.removeClass(document.body, 'register-page');
    this.renderer.addClass(document.body, 'login-page');
  }
  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));
  }
  
}
