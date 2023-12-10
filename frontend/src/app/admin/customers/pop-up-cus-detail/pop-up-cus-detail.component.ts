import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-pop-up-cus-detail',
  templateUrl: './pop-up-cus-detail.component.html',
  styleUrls: ['./pop-up-cus-detail.component.css']
})
export class PopUpCusDetailComponent implements OnInit {
  user: any = null;
  idKH: any;

  constructor(@Inject(MAT_DIALOG_DATA)public data:any, private http: HttpClient) {}

  ngOnInit(): void {
    this.idKH = this.data.idKH;
    this.cusDetailInfo();
  }

  cusDetailInfo() {
    this.http.get("http://localhost:3800/khachhang/getKHDetail/" + this.idKH)
      .subscribe((data: any) => {
        console.log(data.result);
        this.user = data.result;
      })
  }
}
