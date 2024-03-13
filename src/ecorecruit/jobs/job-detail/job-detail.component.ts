import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobDto, JobServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {

  job: JobDto;

  constructor(router: Router,
    _joService: JobServiceProxy,

  ) {

  }
  ngOnInit(): void {
    this.job = new JobDto();
  }
}
