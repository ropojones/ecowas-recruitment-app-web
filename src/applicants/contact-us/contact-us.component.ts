import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from "../../shared/shared.module";
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
    standalone: true,
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.css',
    imports: [MatCardModule, SharedModule, MatGridListModule]
})
export class ContactUsComponent {

}
