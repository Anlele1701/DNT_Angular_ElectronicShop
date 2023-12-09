import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditOrderAdminComponent } from 'src/app/admin/order-management/edit-order-admin/edit-order-admin.component';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css'],
  providers: [API]
})
export class CancelOrderComponent {
  constructor(@Inject(MAT_DIALOG_DATA)public data:any, private api:API, private http:HttpClient, private dialogRef: MatDialogRef<EditOrderAdminComponent>){}
  infoOrder:any
  getInfoOrder(){
    this.infoOrder=this.data
  }

  cancelOrder(){
    this.http.patch(this.api.getAPI()+'/donhang/huyDonHang',{infoOrder:this.infoOrder}).subscribe((data:any)=>{
      this.dialogRef.close('Update Successfully!')
    })
  }

  ngOnInit(): void {
    this.getInfoOrder()
    console.log(this.infoOrder)
  }
}
