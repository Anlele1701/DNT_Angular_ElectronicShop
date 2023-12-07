import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
  providers: [API]
})
export class OrderManagementComponent implements OnInit{
  constructor(private http: HttpClient, private api:API, private router: Router){}
  listDH:any[]=[]


   showlistDH(){
     this.http.get(this.api.getAPI()+'/donhang/quanLyDSDonHang').subscribe((data:any)=>{
      this.listDH=data
      console.log(this.listDH)
    })
  }

  changeToDetailOrder(idDH: string, idKH: string){
    this.router.navigate(['/admin/detail-order/'+idKH+'/'+idDH])
  }

  ngOnInit(): void {
    this.showlistDH()
  }
}
