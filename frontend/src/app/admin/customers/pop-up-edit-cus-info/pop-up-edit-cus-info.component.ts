import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EditOrderAdminComponent } from '../../order-management/edit-order-admin/edit-order-admin.component';

@Component({
  selector: 'app-pop-up-edit-cus-info',
  templateUrl: './pop-up-edit-cus-info.component.html',
  styleUrls: ['./pop-up-edit-cus-info.component.css']
})
export class PopUpEditCusInfoComponent implements OnInit {
  user: any = null;
  idKH: any;

  constructor(@Inject(MAT_DIALOG_DATA)public data:any, private http: HttpClient, private dialogRef: MatDialogRef<EditOrderAdminComponent>) {}

  ngOnInit(): void {
    this.idKH = this.data.idKH;
    this.http.get("http://localhost:3800/khachhang/getKHDetail/" + this.idKH)
      .subscribe((data: any) => {
        this.user = data.result;
      })
  }

  onEditKHInfo() {
    console.log(this.user);
    this.http.patch("http://localhost:3800/khachhang/editCusDetail/" + this.idKH, this.user)
      .subscribe((data: any) => {  
        console.log(this.user)
      })
      this.dialogRef.close({'user':this.user});
  }
}
