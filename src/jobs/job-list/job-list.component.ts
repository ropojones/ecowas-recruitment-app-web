import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LayoutStoreService } from '@shared/layout/layout-store.service';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  title;

  constructor(
    private _layoutStore: LayoutStoreService,
    
  ) {
     
  }
}
