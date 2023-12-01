import { Injectable } from '@angular/core';
import { cartItem } from './cartItem.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  listCartItem: cartItem[] = [];
  constructor() {}

  getCart() {
    this.listCartItem = JSON.parse(localStorage.getItem('cartList'));
    if (this.listCartItem == null) this.listCartItem = [];
  }
  addItemToCart(item: cartItem) {
    //thêm sp vào giỏ hàng
    this.getCart();
    if (this.listCartItem === null) {
      this.listCartItem.push(item);
      localStorage.setItem('cartList', JSON.stringify(this.listCartItem));
    } else {
      const index = this.listCartItem.findIndex(
        (cartItem) => cartItem.idSP === item.idSP
      );
      if (index === -1) {
        this.listCartItem.push(item);
        localStorage.setItem('cartList', JSON.stringify(this.listCartItem));
      } else {
        if (
          this.listCartItem[index].soLuongMua + 1 <=
          this.listCartItem[index].soLuongHienCo
        ) {
          this.listCartItem[index].soLuongMua++;
          this.listCartItem[index].thanhTien =
            this.listCartItem[index].giaTien *
            this.listCartItem[index].soLuongMua;
          localStorage.setItem('cartList', JSON.stringify(this.listCartItem));
        }
      }
    }
  }

  buyCart() {
    //mua trong giỏ hàng
  }

  buyNow() {
    //mua liền
  }
}
