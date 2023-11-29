import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-product',
  templateUrl: './form-create-product.component.html',
  styleUrls: ['./form-create-product.component.css']
})
export class FormCreateProductComponent implements OnInit{
  tenHang:string=''
  hinhAnhProduct:FormData
  product:FormData
  listHang:string[]=[]
  tenLoaiSP:string=''
  constructor(private http:HttpClient, private route:ActivatedRoute, private productRoute:Router){
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

  createNewProduct(data:FormData){
    this.product=data
    this.product.append('tenLoaiSP',this.tenLoaiSP)
    this.product.append('tenHang',this.tenHang)
    this.http.post(this.API+'sanpham/createNewProduct',this.product).subscribe((data:any)=>{
      console.log(data)
    })
    this.productRoute.navigate['/admin/products']
  }
  pasteHinhAnh(data:FormData){

  }
}
