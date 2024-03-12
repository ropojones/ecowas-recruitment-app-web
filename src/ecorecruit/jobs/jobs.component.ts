import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApplicantDto, JobServiceProxy, JobDto, JobDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import {
  MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition'
import { DeleteJobComponent } from './delete-job/delete-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs';

class PagedJobsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
  sorting: string;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default,


})
export class JobsComponent extends  PagedListingComponentBase<JobDto>  implements OnInit {

  id: number;
  applicant: ApplicantDto;
  job = new JobDto();
  jobs: JobDto[] = []; 
  
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  profileJobs: JobDto[];


  constructor(
    injector: Injector,
    private _jobService: JobServiceProxy,
    private _modalService: BsModalService,
    public dialog: MatDialog,
    private router: Router
  ) {
    super(injector);

  }


  ngOnInit(): void {
   
  }

 
  
  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedJobsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._jobService.getJobs
      (
        request.keyword,
        request.isActive,
        request.sorting,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: JobDtoPagedResultDto) => {
        this.jobs = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(job: JobDto): void {
    abp.message.confirm(
      this.l('JobDeleteWarningMessage', job.title),
      undefined,
      (result: boolean) => {
        if (result) {
          this._jobService.delete(job.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

    //Add user job
  addJob(): void {
    this.router.navigate(['/ecorecruit/jobs/create']);
    // const dialogRef = this.dialog.open(CreateJobComponent, {
    //   height: '70%',
    //   width: '80%',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.list;
    // });
  }


  //Update user job
  editJob(job: JobDto): void {
    const dialogRef = this.dialog.open(UpdateJobComponent, {
      data: job,
      height: '60%',
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.list;
    });
  }

  //Delete user job
  deleteJob(job: JobDto): void {
    const dialogRef = this.dialog.open(DeleteJobComponent, {
      data: job,
      height: '50%',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.list;
    });
  }


  


}