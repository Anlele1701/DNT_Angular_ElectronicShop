import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingIndicatorService {
  private loadDataSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  loadingData$ = this.loadDataSubject.asObservable();
  setLoadingData(loading: boolean) {
    this.loadDataSubject.next(loading);
  }
}