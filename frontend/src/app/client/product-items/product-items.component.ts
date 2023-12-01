import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css'],
})
export class ProductItemsComponent {
  @Input() product: any;
  @Input() tenSP:string=''
  loaiSP:string=''

  constructor(private activeRoute:ActivatedRoute, private router:Router){}
  detailPage(){
    this.activeRoute.params.subscribe(params=>{
      this.loaiSP=params['loaiSP']
    })
    this.router.navigate(['/category/'+this.loaiSP,this.tenSP],{
      queryParams:{product: JSON.stringify(this.product)}
    })
  }
}
