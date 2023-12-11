import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API } from 'src/app/services/API.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css'],
  providers: [API],
})
export class PersonalPageComponent implements OnInit {
  user: any;
  activeIndex = 0;
  onClickBtnMenu(index: number) {
    this.activeIndex = index;
  }
  orderInfo: string = '';
  countDH: number = 0;
  constructor(
    public userService: UserServiceService,
    private router: Router,
    private http: HttpClient,
    private api: API,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
    this.getAllDH();

    // Cập nhật thanh toán thành công momo
    //const orderInfo = this.cartService.idDonHang;
    const orderInfo = this.route.snapshot.queryParamMap.get('orderInfo');
    const resultCode = this.route.snapshot.queryParamMap.get('resultCode');
    this.orderInfo = orderInfo;
    console.log(orderInfo, resultCode);
    if (resultCode === '0') {
      this.onUpdateSuccessMomo();
      this.router.navigate(['/client/personal']);
    }
  }

  onUpdateSuccessMomo() {
    this.http
      .post(this.api.getAPI() + '/payment/momo/confirm', {
        orderInfo: this.orderInfo,
      })
      .subscribe((data: any) => {
        console.log(data);
      });
  }
  getAllDH() {
    this.http
      .get(this.api.getAPI() + '/donhang/showdonhang/' + this.user._id)
      .subscribe((data: any) => {
        data.forEach((item) => {
          this.countDH++;
        });
      });
  }

  logOut() {
    this.userService.logOUt();
    this.router.navigate(['/client/homepage']);
  }
}
