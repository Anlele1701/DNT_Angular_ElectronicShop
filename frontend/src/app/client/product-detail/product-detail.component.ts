import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { API } from 'src/app/services/API.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers:[API]
})
export class ProductDetailComponent implements OnInit{
  loaiSP:string=''
  product:any
  constructor(private api:API, private activeRoute:ActivatedRoute, private router:Router){
    this.product=this.activeRoute.snapshot.params['detail']
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.product = JSON.parse(params['product']);
      console.log(this.product)
    });
    this.activeRoute.params.subscribe(params=>{
      this.loaiSP=params['loaiSP']
      console.log(this.loaiSP)
    })
    window.scrollTo(0,0)
  }
}
