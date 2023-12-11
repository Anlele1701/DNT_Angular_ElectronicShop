import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCreateCusComponent } from './pop-up-create-cus/pop-up-create-cus.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { PopUpCusDetailComponent } from './pop-up-cus-detail/pop-up-cus-detail.component';
import { PopUpEditCusInfoComponent } from './pop-up-edit-cus-info/pop-up-edit-cus-info.component';
import { LoadDataService } from '../shared/load-data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
})
export class CustomersComponent implements OnInit {
  listCus: any[] = [];
  searchTerm = '';
  customerList$: Observable<any[]>;
  constructor(private http: HttpClient, private popUp: MatDialog, private loadData: LoadDataService) {}

  ngOnInit(): void {
    this.showAllCus();
  }

  // getAllCusInfo() {
  //   this.http
  //     .get('http://localhost:3800/khachhang/allCusInfo')
  //     .subscribe((data: any) => {
  //       this.listCus = data.result;
  //       console.log(this.listCus);
  //     });
  // }
  showAllCus() {
    this.loadData.setLoadingData(true);
    const brandListSubject = new BehaviorSubject<any[]>([]);
    this.http.get('http://localhost:3800/khachhang/allCusInfo').subscribe(
      (data: any) => {
        brandListSubject.next(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.loadData.setLoadingData(false);
      }
    );
    this.customerList$ = brandListSubject.asObservable();
  }
  popUpCreateKH(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const popup = this.popUp.open(PopUpCreateCusComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    popup.afterClosed().subscribe((result) => {
      this.showAllCus();
    });
  }

  popUpCusDetail(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    idKH: any
  ): void {
    // POPUP
    const popup = this.popUp.open(PopUpCusDetailComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        idKH: idKH,
      },
    });
    popup.afterClosed().subscribe((result) => {
    });
  }

  popUpEditCusInfo(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    idKH: any
  ): void {
    const popup = this.popUp.open(PopUpEditCusInfoComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        idKH: idKH,
      },
    });
    popup.afterClosed().subscribe((result) => {
      this.showAllCus();
    });
  }
  onSearch() {
    console.log(this.searchTerm)
    if (this.searchTerm.trim() !== '') {
      const searchResultSubject = new BehaviorSubject<any[]>([]);

      this.http.get('http://localhost:3800/khachhang/find/' + this.searchTerm).subscribe(
        (data: any) => {
          searchResultSubject.next(data);
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );

      this.customerList$ = searchResultSubject.asObservable();
    } else {
      this.showAllCus();
    }
  }
}
