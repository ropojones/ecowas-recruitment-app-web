import { Component, Injector, Output , Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput
} from '@shared/service-proxies/service-proxies';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AccountPageService } from 'account/account.service';

@Component({
  templateUrl: './register.component.html',
  animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase {
  model: RegisterInput = new RegisterInput();
  saving = false;
  data: string
  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private authService: AppAuthService,
    private renderer: Renderer2, 
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'register-page');
    this.renderer.removeClass(document.body, 'login-page');
  }

  save(): void {
    this.saving = true;
    this._accountService
      .register(this.model)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          this.notify.success(this.l('SuccessfullyRegistered'));
          this._router.navigate(['/account/login']);
          return;
        }

        // Autheticate
        this.saving = true;
        this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName;
        this.authService.authenticateModel.password = this.model.password;
        this.authService.authenticate(() => {
          this.saving = false;
        });
      });
  }
}
