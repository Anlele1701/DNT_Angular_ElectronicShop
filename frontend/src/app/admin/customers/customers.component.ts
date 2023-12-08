import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCreateCusComponent } from './pop-up-create-cus/pop-up-create-cus.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../shared/AdminIndex.css']
})
export class CustomersComponent implements OnInit {
  listCus:any[] = [];

  constructor(private http: HttpClient, private popUp: MatDialog) {}

  ngOnInit(): void {
    this.getAllCusInfo();
  }

  getAllCusInfo() {
    this.http.get("http://localhost:3800/khachhang/allCusInfo").subscribe((data:any) => {
      this.listCus = data.result;
    })
  }

  popUpCreateKH(enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const popup = this.popUp.open(PopUpCreateCusComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    popup.afterClosed().subscribe(result =>{
      console.log(result);
    })
    }
}
