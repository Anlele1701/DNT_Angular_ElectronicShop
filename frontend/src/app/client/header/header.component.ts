import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginRegisComponent } from '../login-regis/login-regis.component';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  slcart: number = 0;
  onClicked: boolean = false;
  tenSP: string;
  searchResults: any[];

  constructor(
    private router: Router,
    public popUp: MatDialog,
    private userService: UserServiceService,
    private cartService: CartService,
    private http: HttpClient
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

  changeToPersonalPage() {
    this.router.navigate(['/client/personal']);
  }
  countSL() {
    this.cartService.countCartList().subscribe((value) => {
      this.slcart = value;
      console.log(this.slcart);
    });
  }
  searchBarclicked() {
    this.onClicked = !this.onClicked;
    setTimeout(() => {
      document.addEventListener('click', this.handleOutsideClick);
    }, 0);
  }
  checkLogin() {
    return this.userService.checkLogin();
  }
  handleOutsideClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const searchboxElement = document.querySelector('.searchbox');
    if (searchboxElement && !searchboxElement.contains(clickedElement)) {
      this.onClicked = !this.onClicked;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }
  handlekeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.http
        .get('http://localhost:3800/sanpham/findSP/' + this.tenSP)
        .subscribe(
          (data: any[]) => { 
            this.searchResults = data;
            console.log(data);
          },
          (error) => {
            console.error(error);
          }
        );
      this.router.navigate(['/client/searchpage'], { queryParams: { tenSP: this.tenSP } });
    }
  }
}
