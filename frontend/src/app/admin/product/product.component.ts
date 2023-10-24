import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  nameProduct:String=''
  listProduct:any[]=[]

  readonly API='http://localhost:3800/'
  constructor(private route:ActivatedRoute, private http:HttpClient, private router:Router){}
  ngOnInit(): void {
      this.route.paramMap.subscribe((params)=>{
        this.nameProduct=params.get('nameProduct')
      })
      this.getProductFromCate()
  }
  getProductFromCate(){
    this.http.post(this.API+'sanpham/getAllSanPham',{nameProductCate:this.nameProduct}).subscribe((data:any)=>{
      data.forEach(item=>{
        this.listProduct.push(item)
        console.log(item.tenHang)
      })
      console.log(this.listProduct)
    })
  }

  getFormCreateProductPage(nameProduct:String){
    console.log(nameProduct)
    this.router.navigate([`/admin/createNewProduct`,nameProduct])
  }
}
