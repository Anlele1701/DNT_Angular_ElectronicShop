import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private http: HttpClient, private router:Router){}
  activeindex = 0;
  countLoaiSP:number=0
  listLoaiSP:string[]=[]
  readonly API='http://localhost:3800'
  onClickSideBar(index: number){
    this.activeindex = index;
  }
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
    this.router.navigate(['/admin/products',item]);
  }
}
