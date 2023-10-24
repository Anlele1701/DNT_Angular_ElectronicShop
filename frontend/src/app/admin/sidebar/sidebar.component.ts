import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { count } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private http: HttpClient, private router:Router){}
  countLoaiSP:number=0
  listLoaiSP:string[]=[]
  readonly API='http://localhost:3800'
  countAllLoaiSP(){
    this.http.get(this.API+'/loaisp/countLoaiSP').subscribe((data:any)=>{
      this.countAllLoaiSP=data.sumLoaiSP
      this.listLoaiSP=data.listLoaiSP
    })
  }
  ngOnInit(): void {
    this.countAllLoaiSP()
  }
  changeToProductPage(item:string)
  {
    this.router.navigate(['/admin/products',item])
  }
}
