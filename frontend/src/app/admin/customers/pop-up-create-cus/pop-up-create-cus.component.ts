import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditOrderAdminComponent } from '../../order-management/edit-order-admin/edit-order-admin.component';

@Component({
  selector: 'app-pop-up-create-cus',
  templateUrl: './pop-up-create-cus.component.html',
  styleUrls: ['./pop-up-create-cus.component.css']
})
export class PopUpCreateCusComponent implements OnInit {
  user: any={};
  idKH: any;

  constructor(@Inject(MAT_DIALOG_DATA)public data:any, private http: HttpClient, private dialogRef: MatDialogRef<EditOrderAdminComponent>) { }

  ngOnInit(): void {
  }
  
  onCreateKH() {
    console.log(this.user)
    this.http.post("http://localhost:3800/khachhang/createNewCus", this.user)
      .subscribe((data: any) => {
      })
  }
}
