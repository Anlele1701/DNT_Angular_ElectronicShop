import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCreateCusComponent } from './pop-up-create-cus/pop-up-create-cus.component';
import { BehaviorSubject } from 'rxjs';
import { PopUpCusDetailComponent } from './pop-up-cus-detail/pop-up-cus-detail.component';
import { PopUpEditCusInfoComponent } from './pop-up-edit-cus-info/pop-up-edit-cus-info.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../shared/AdminIndex.css']
})
export class CustomersComponent implements OnInit {
  listCus:any[] = [];
  searchTerm = '';
  constructor(private http: HttpClient, private popUp: MatDialog) { }

  ngOnInit(): void {
    this.getAllCusInfo();
  }

  getAllCusInfo() {
    this.http.get("http://localhost:3800/khachhang/allCusInfo").subscribe((data: any) => {
      this.listCus = data.result;
      console.log(this.listCus);
    })
    
  }

  popUpCreateKH(enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const popup = this.popUp.open(PopUpCreateCusComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    popup.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  popUpCusDetail(enterAnimationDuration: string,
    exitAnimationDuration: string,
    idKH: any
  ): void {
    
    // POPUP
    const popup = this.popUp.open(PopUpCusDetailComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        idKH: idKH
      }
    });
    popup.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  popUpEditCusInfo(enterAnimationDuration: string,
    exitAnimationDuration: string,
    idKH: any
  ): void {
    const popup = this.popUp.open(PopUpEditCusInfoComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        idKH: idKH
      }
    });
    popup.afterClosed().subscribe(result => {
      var user = result.user
      console.log(result.user);
      const index = this.listCus.findIndex(item => item._id=== user._id)
      if(index){
        this.listCus[index] = user
      }
    })
  }
}
