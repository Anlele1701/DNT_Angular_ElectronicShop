import { CartService } from './../../services/cartService/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { API } from 'src/app/services/API.service';
import { cartItem } from 'src/app/services/cartService/cartItem.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [API, cartItem],
})
export class ProductDetailComponent implements OnInit {
  loaiSP: string = '';
  product: any;
  constructor(
    private api: API,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cartitem: cartItem
  ) {
    this.product = this.activeRoute.snapshot.params['detail'];
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.product = JSON.parse(params['product']);
      console.log(this.product);
    });
    this.activeRoute.params.subscribe((params) => {
      this.loaiSP = params['loaiSP'];
      console.log(this.loaiSP);
    });
    window.scrollTo(0, 0);
  }

  addItemToCart() {
    this.cartitem = {
      idSP: this.product._id,
      tenSP: this.product.tenSP,
      hinhAnh: this.product.hinhAnh[0].tenImageSP,
      soLuongHienCo: this.product.soLuong,
      soLuongMua: 1,
      giaTien: this.product.giaTien,
      thanhTien: this.product.giaTien,
    };
    this.cartService.addItemToCart(this.cartitem);
  }

  buyNow() {
    this.addItemToCart();
    this.router.navigate(['/client/shopping-cart']);
  }
}
