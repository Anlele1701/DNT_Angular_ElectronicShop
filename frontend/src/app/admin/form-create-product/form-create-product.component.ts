import { ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-product',
  templateUrl: './form-create-product.component.html',
  styleUrls: ['./form-create-product.component.css']
})
export class FormCreateProductComponent implements OnInit{
  tenHang:string=''
  product:any
  listHang:string[]=[]
  tenLoaiSP:string=''
  constructor(private http:HttpClient, private route:ActivatedRoute){
    this.route.paramMap.subscribe(params=>{
      this.tenLoaiSP=params.get('nameProduct')
    })
  }
  readonly API="http://localhost:3800/"
  getAllHang(){
    this.http.post(this.API+"hang/getAllHangFromCate",{tenLoaiSP:this.tenLoaiSP}).subscribe((data:any)=>{
      data.forEach(element => {
        console.log(element)
        this.listHang.push(element)
      });
    })
  }
  ngOnInit(): void {
      this.getAllHang()
  }

  createNewProduct(data:any){
    this.product=data
    this.http.post(this.API+'sanpham/createNewProduct',{product:this.product,tenLoaiSP:this.tenLoaiSP, tenHang:this.tenHang}).subscribe((data:any)=>{
      console.log(data)
    })
  }
}
