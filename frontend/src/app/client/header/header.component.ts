import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginRegisComponent } from '../login-regis/login-regis.component';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  slcart:number;
  constructor(
    private router: Router,
    public popUp: MatDialog,
    private userService: UserServiceService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.countSL();
  }
  reloadCategory(loaiSP) {
    this.router.navigate(['/client/category', loaiSP]).then(() => {
      window.location.reload();
    });
  }
  openLogin(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const popup = this.popUp.open(LoginRegisComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    popup.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
  countSL(){
    this.slcart = this.cartService.countCartList();
  }
  changeToPersonalPage() {
    this.router.navigate(['/client/personal']);
  }
  checkLogin() {
    return this.userService.checkLogin();
  }
}
