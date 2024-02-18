import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
  selector: 'app-applicant-left-navbar',
  templateUrl: './applicant-left-navbar.component.html',
  styleUrl: './applicant-left-navbar.component.css'
})
export class ApplicantLeftNavbarComponent implements OnInit {
  sidebarExpanded: boolean;

 @Input() public pageTitle;
  constructor(
    private _layoutStore: LayoutStoreService,

  ) {
  
   
  }
  ngOnInit(): void {
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
}
