import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadDataService {
  private loadingDataSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  loadingData$ = this.loadingDataSubject.asObservable();

  setLoadingData(loading: boolean) {
    this.loadingDataSubject.next(loading);
  }
}
