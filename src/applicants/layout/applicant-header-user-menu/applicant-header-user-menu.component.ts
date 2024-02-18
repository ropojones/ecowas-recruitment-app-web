import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'app-applicant-header-user-menu',
  templateUrl: './applicant-header-user-menu.component.html',
  styleUrl: './applicant-header-user-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApplicantHeaderUserMenuComponent{
  constructor(private _authService: AppAuthService) {}

  logout(): void {
    this._authService.logout();
  }
}
