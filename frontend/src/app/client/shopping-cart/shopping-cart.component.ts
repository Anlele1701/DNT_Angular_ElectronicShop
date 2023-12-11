import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { cartItem } from 'src/app/services/cartService/cartItem.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { LoginRegisComponent } from '../login-regis/login-regis.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [cartItem],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private cartitem: cartItem,
    private userService: UserServiceService,
    private router: Router,
    private popup: MatDialog
  ) {}
  tongTien: number;
  tongSLMua: number;
  cartList: cartItem[] = [];
  counter(type: string, idSP: string, giaTien: number, slHienCo: number) {
    if (type === 'add') {
      if (this.showSoLuongMua(idSP) + 1 <= slHienCo) {
        this.tongTien = this.tongTien + giaTien;
        this.tongSLMua++;
      }
      return this.cartService.plusOneItem(idSP)
    }
    else{
      if(this.showSoLuongMua(idSP)-1>=1)
      {
        this.tongTien=this.tongTien-giaTien
        this.tongSLMua--
      }
      return this.cartService.minusOneItem(idSP)
    }
  }

  showSoLuongMua(idSP) {
    return this.cartService.showSLMua(idSP);
  }

  showThanhTien(idSP) {
    return this.cartService.updateThanhTien(idSP);
  }

  getCartList() {
    this.cartList = this.cartService.getCart();
  }

  ngOnInit(): void {
    this.getCartList()
    this.tongTien=this.cartService.updateTongTien()
    this.tongSLMua=this.cartService.updateTongSLMua()
    this.cartService.countCartList();
  }

  deleteItemCart(idSP: string){
    this.cartList=this.cartService.deleteItem(idSP)
    this.tongSLMua=this.cartService.updateTongSLMua()
    this.tongTien=this.cartService.updateTongTien()
    this.cartService.countCartList();
  }

  deleteAll()
  {
    this.cartList=this.cartService.deleteAll()
    this.tongSLMua=0
    this.tongTien=0
    this.cartService.countCartList();
  }

  changeToPurchasePage() {
    if (this.userService.checkLogin()) {
      if (this.cartList.length == 0) {
      } else {
        this.router.navigate(['/client/purchase']);
      }
    } else {
      const popup = this.popup.open(LoginRegisComponent, {});
      popup.afterClosed().subscribe((result) => {
        console.log(result);
      });
    }
  }
  Gobackpage() {
    this.router.navigate(['/client/category/Điện Thoại'])
  }
}
