import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { API } from 'src/app/services/API.service';
import { EditOrderAdminComponent } from './edit-order-admin/edit-order-admin.component';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
  providers: [API]
})
export class OrderManagementComponent implements OnInit{
  constructor(private http: HttpClient, private api:API, private router: Router, private matdialog:MatDialog){}
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

  editOrder(info:any){
    console.log(info)
    const dialogRef=this.matdialog.open(EditOrderAdminComponent,{
      data: {
        idKH: info.idKH,
        idDH:info.donHang.idDonHang,
        ttThanhToan:info.donHang.trangThaiTT,
        nguoiNhan:info.donHang.nguoiNhan,
        sdt: info.donHang.sdt,
        diaChi:info.donHang.diaChi
      }
    })
    dialogRef.afterClosed().subscribe((result)=>{
      if(result==='Update Successfully!')
      {
        console.log(result)
        window.location.reload()
      }
    })
  }

  ngOnInit(): void {
    this.showlistDH()
  }
}
