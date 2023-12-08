import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/services/API.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { cartItem } from 'src/app/services/cartService/cartItem.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [cartItem, API]
})
export class PurchaseComponent implements OnInit{
  constructor(private userService:UserServiceService, private cartService: CartService, private router: Router, private http:HttpClient, private api:API){}
  userInfo:any
  cartList:cartItem[]
  userOrder={
    id:'',
    hoten:'',
    sdt:'',
    address:'',
    ptTT: 'Thanh toán tiền mặt',
    tongSL: 0,
    tamTinh:0,
    tienKM:0,
    thueVAT:0,
    tongTien:0
  }
  getUserInfo()
  {
    this.userInfo=this.userService.getUser()
    this.userOrder.hoten=this.userInfo.hoTen
    this.userOrder.sdt=this.userInfo.sdt
    this.userOrder.id=this.userInfo._id
  }

  getCartList()
  {
    this.cartList=this.cartService.getCart()
  }

  getTamTinh(){
    this.userOrder.tamTinh=this.cartService.updateTongTien()
    if(this.userInfo.hangThanhVien==='Đồng')
    {
      this.userOrder.tienKM=this.userOrder.tamTinh*3/100
    }
    else if(this.userInfo.hangThanhVien==='Bạc')
    {
      this.userOrder.tienKM=this.userOrder.tamTinh*5/100
    }
    else{
      this.userOrder.tienKM=this.userOrder.tamTinh*7/100
    }
    this.userOrder.thueVAT=this.userOrder.tamTinh*8/100
    this.userOrder.tongTien=this.userOrder.tamTinh-this.userOrder.tienKM+this.userOrder.thueVAT
  }

  getTongSL(){
    this.userOrder.tongSL=this.cartService.updateTongSLMua()
  }

  thanhToan(){
    console.log(this.userOrder)
    console.log(this.cartList)
    this.http.post(this.api.getAPI()+'/donhang/muaHang',{userOrder:this.userOrder, cartList: this.cartList}).subscribe((data:any)=>{
      if(data){
        this.router.navigate(['/client/personal'])
        this.cartService.deleteAll()
      }
    })
  }

  ngOnInit(): void {
      this.getUserInfo()
      this.getCartList()
      this.getTamTinh()
      this.getTongSL()
  }
}
