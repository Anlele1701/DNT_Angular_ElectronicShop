import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  listLoaiSP: string[] = [];

  readonly API = 'http://localhost:3800';
  constructor(private http: HttpClient, private el: ElementRef) {}
  ngOnInit(): void {
    this.showAllCategories();
  }
  showAllCategories() {
    this.http.get(this.API + '/loaisp/countLoaiSP').subscribe((data: any) => {
      this.listLoaiSP = data.listLoaiSP;
    });
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
}
