import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  constructor(private http:HttpClient){}
  brandName:string=''
  brandList:any[]=[]
  readonly API='http://localhost:3800'
  createNewBrand(){
    this.http.post(this.API+'/hang/createNewHang',{tenHang:this.brandName}).subscribe((data:any)=>{
      console.log(this.brandName)
    })
  }

  showAllBrand(){
    this.http.get(this.API+'/hang/getAllHang').subscribe((data:any)=>{
      data.forEach((item:any)=>{
        this.brandList.push(item)
      })
    })
  }


  ngOnInit(): void {
    this.showAllBrand()
  }
}
