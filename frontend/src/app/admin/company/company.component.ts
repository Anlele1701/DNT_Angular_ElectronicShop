import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  stringLoaiSP: string=''
  constructor(private http:HttpClient){}
  brandName:string=''
  brandList:any[]=[]
  readonly API='http://localhost:3800'
  createNewBrand(){
    this.http.post(this.API+'/hang/createNewHang',{tenHang:this.brandName}).subscribe((data:any)=>{
      console.log(this.brandName)
      window.location.reload()
    })
  }

  showAllBrand(){
    this.http.get(this.API+'/hang/getAllHang').subscribe((data:any)=>{
      data.forEach((item:any)=>{
        this.brandList.push(item)
      })
    })
  }
  deleteBrand(idSP){
    this.http.delete(this.API+'/hang/delete/'+idSP).subscribe((data:any)=>{
      console.log(data)
    })
  }

  ngOnInit(): void {
    this.showAllBrand()
  }

  returnStringLoaiSP(itemHang){
    this.stringLoaiSP=''
    itemHang.forEach(item=>{
      this.stringLoaiSP=this.stringLoaiSP+item+', '
    })
    return this.stringLoaiSP
  }
}
