import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-edit-order-admin',
  templateUrl: './edit-order-admin.component.html',
  styleUrls: ['./edit-order-admin.component.css'],
  providers: [API]
})
export class EditOrderAdminComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA)public data:any, private api:API, private http:HttpClient, private dialogRef: MatDialogRef<EditOrderAdminComponent>){}
  infoOrder:any
  getInfoOrder(){
    this.infoOrder=this.data
    console.log(this.infoOrder)
  }

  updateInfoOrder(){
    this.http.patch(this.api.getAPI()+'/donhang/updateTTDonHang',{infoOrder:this.infoOrder}).subscribe((data:any)=>{
      this.dialogRef.close('Update Successfully!')
    })
  }

  cancelOrder(){
    this.http.patch(this.api.getAPI()+'/donhang/huyDonHang',{infoOrder:this.infoOrder}).subscribe((data:any)=>{
      this.dialogRef.close('Update Successfully!')
    })
  }

  recoveryOrder(){
    this.http.patch(this.api.getAPI()+'/donhang/khoiPhucDonHang',{infoOrder:this.infoOrder}).subscribe((data:any)=>{
      this.dialogRef.close('Update Successfully!')
    })
  }

  ngOnInit(): void {
    this.getInfoOrder()
    console.log(this.infoOrder)
  }
}
