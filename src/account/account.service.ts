import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AccountPageService {
  private data = new BehaviorSubject('login-page');
  data$ = this.data.asObservable();

  changeData(data: string) {
    this.data.next(data)
  }
}