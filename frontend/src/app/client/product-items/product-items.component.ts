import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { CartService } from 'src/app/services/cartService/cart.service';
import { cartItem } from 'src/app/services/cartService/cartItem.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css'],
  providers: [cartItem],
})
export class ProductItemsComponent {
  @Input() product: any;
  @Input() tenSP: string = '';
  loaiSP: string = '';
  cartitem: cartItem;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}
  detailPage() {
    this.activeRoute.params.subscribe((params) => {
      this.loaiSP = params['loaiSP'];
    });
    this.router.navigate(['/client/category/' + this.loaiSP, this.tenSP], {
      queryParams: { product: JSON.stringify(this.product) },
    });
  }

  buyNow() {
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
    this.cartService.countCartList();
    this.router.navigate(['/client/shopping-cart']);
  }
}
