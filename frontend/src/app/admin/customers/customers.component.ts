import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['../shared/AdminIndex.css']
})
export class CustomersComponent implements OnInit {
  listCus:any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllCusInfo();
  }

  getAllCusInfo() {
    this.http.get("http://localhost:3800/khachhang/allCusInfo").subscribe((data:any) => {
        this.listCus = data.result;
    })
  }
}
