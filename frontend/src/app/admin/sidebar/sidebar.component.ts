import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private http: HttpClient){}
  countLoaiSP:number=0
  readonly API='http://localhost:3800'
  countAllLoaiSP(){
    this.http.get(this.API+'/loaisp/countLoaiSP').subscribe((data:any)=>{
      this.countAllLoaiSP=data.sumLoaiSP
    })
  }
}
