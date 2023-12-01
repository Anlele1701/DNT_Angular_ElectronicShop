import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { cartItem } from 'src/app/services/cartService/cartItem.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [cartItem]
})
export class PurchaseComponent implements OnInit{
  constructor(private userService:UserServiceService, private cartService: CartService, private router: Router){}
  userInfo:any
  cartList:cartItem[]
  tamTinh: number=0
  tongSL: number=0
  getUserInfo()
  {
    this.userInfo=this.userService.getUser()
  }

  getCartList()
  {
    this.cartList=this.cartService.getCart()
  }

  getTamTinh(){
    this.tamTinh=this.cartService.updateTongTien()
  }

  getTongSL(){
    this.tongSL=this.cartService.updateTongSLMua()
  }

  ngOnInit(): void {
      this.getUserInfo()
      this.getCartList()
      this.getTamTinh()
      this.getTongSL()
  }
}
