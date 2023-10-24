import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  categoryName:string=''
  listLoaiSP:string[]=[]
  readonly API='http://localhost:3800'
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.showAllCategories()
  }
  showAllCategories(){
    this.http.get(this.API+'/loaisp/countLoaiSP').subscribe((data:any)=>{
      this.listLoaiSP=data.listLoaiSP
    })
  }

  createnewLoaiSP(){
    this.http.post(this.API+'/loaisp/createLoaiSP',{tenLoai:this.categoryName}).subscribe((data:any)=>{
      console.log(data)
      window.location.reload()
    })
  }
}
