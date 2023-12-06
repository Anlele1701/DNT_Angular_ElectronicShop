import { Injectable } from '@angular/core';
import { cartItem } from './cartItem.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  listCartItem: cartItem[] = [];
  countCart: number =0;
  constructor() {}

  getCart() {
    this.listCartItem = JSON.parse(localStorage.getItem('cartList'));
    if (this.listCartItem == null) this.listCartItem = [];
    return this.listCartItem
  }
  countCartList(){
    this.getCart()
    this.listCartItem.forEach(item=>{
      this.countCart = item.soLuongMua + this.countCart
    })
    return this.countCart
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

  plusOneItem(idSP: string, ){
    this.getCart()
    const index = this.listCartItem.findIndex(
      (cartItem) => cartItem.idSP === idSP
    );
    if(this.listCartItem[index].soLuongMua+1<=this.listCartItem[index].soLuongHienCo)
    {
      this.listCartItem[index].soLuongMua++
      this.updateThanhTien(idSP)
      return this.listCartItem[index].soLuongMua
    }
    else return 0
  }

  minusOneItem(idSP: string, ){
    this.getCart()
    const index = this.listCartItem.findIndex(
      (cartItem) => cartItem.idSP === idSP
    );
    if(this.listCartItem[index].soLuongMua-1>=1)
    {
      this.listCartItem[index].soLuongMua--
      this.updateThanhTien(idSP)
      return this.listCartItem[index].soLuongMua
    }
    else return 0
  }

  showSLMua(idSP: string)
  {
    const index = this.listCartItem.findIndex(
      (cartItem) => cartItem.idSP === idSP
    );
    return this.listCartItem[index].soLuongMua
  }

  updateThanhTien(idSP: string){
    const index = this.listCartItem.findIndex(
      (cartItem) => cartItem.idSP === idSP
    );
    this.listCartItem[index].thanhTien=this.listCartItem[index].giaTien*this.listCartItem[index].soLuongMua
    localStorage.setItem('cartList', JSON.stringify(this.listCartItem));
    return this.listCartItem[index].thanhTien
  }

  updateTongTien(){
    this.getCart()
    let tong=0
    this.listCartItem.forEach(item=>{
      tong=tong+item.thanhTien
    })
    return tong
  }


  updateTongSLMua()
  {
    this.getCart()
    let tong=0
    this.listCartItem.forEach(item=>{
      tong=tong+item.soLuongMua
    })
    return tong
  }

  deleteItem(idSP: string){
    this.getCart()
    const index=this.listCartItem.findIndex(item=>item.idSP===idSP)
    this.listCartItem.splice(index,1)
    localStorage.setItem('cartList', JSON.stringify(this.listCartItem));
    return this.listCartItem
  }

  deleteAll(){
    localStorage.removeItem('cartList')
    return null
  }

  buyCart() {
    //mua trong giỏ hàng
  }

  buyNow() {
    //mua liền
  }
}
