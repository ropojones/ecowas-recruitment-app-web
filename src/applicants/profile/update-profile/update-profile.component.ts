import { Component } from '@angular/core';
import { ApplicantDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
applicant = new ApplicantDto ();
id: number;
}
