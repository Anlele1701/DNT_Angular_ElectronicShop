import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'highcharts';
import { Observable } from 'rxjs';
import { LoadDataService } from '../shared/load-data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  listLoaiSP: any[] = [];
  isShow = false;
  isNotification = false;
  newTenLoai = '';

  readonly API = 'http://localhost:3800';
  constructor(private http: HttpClient, private el: ElementRef, private loadData: LoadDataService) {}
  ngOnInit(): void {
    this.showAllCategories();
  }
  showAllCategories() {
    this.loadData.setLoadingData(true);
    this.http.get(this.API + '/loaisp/countLoaiSP').subscribe(
      (data: any) => {
        this.listLoaiSP = data.listLoaiSP;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.loadData.setLoadingData(false);
      }
    );
  }

  createnewLoaiSP() {
    this.http
      .post(this.API + '/loaisp/createLoaiSP', { tenLoai: this.categoryName })
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
  // FUNCTIONS
  AddFormVisible: boolean = false;

  toggleAddForm() {
    this.AddFormVisible = !this.AddFormVisible;
  }
  hideAddForm() {
    this.AddFormVisible = false;
  }

  //Xóa loại sp
  deleteLSP(idLSP: string) {
    this.http
      .delete(this.API + '/loaisp/deleteLoaiSP/' + idLSP)
      .subscribe((data: any) => {
        if (data.status) {
          this.isNotification = true;
          this.isShow = true;
          this.showAllCategories();
        } else {
          this.isShow = true;
          this.isNotification = false;
        }
      });
  }
  //Update loại sp
  updateLSP(idLSP: string, dataUpdate: string) {
    const data = { tenLoai: this.newTenLoai };
    this.http
      .patch(this.API + '/loaisp/updateLoaiSP/' + idLSP, data)
      .subscribe((data: any) => {
        if (data.status) {
          alert('Cập nhật thành công!');
        } else {
          alert('Cập nhật thất bại!');
        }
        this.newTenLoai = '';
        this.showAllCategories();
      });
  }
}
