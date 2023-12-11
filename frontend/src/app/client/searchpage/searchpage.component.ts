import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import { cartItem } from 'src/app/services/cartService/cartItem.service';
import { LoadingIndicatorService } from 'src/app/services/loading-indicator.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css'],
  providers: [cartItem],
})
export class SearchpageComponent implements OnInit {
  searchResults: any[];
  loaiSP: string = '';
  @Input() tenSP: string = '';
  @Input() product: any;
  cartitem: cartItem;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cartService: CartService,
    private loadData: LoadingIndicatorService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loadData.setLoadingData(true);
      const tenSP = params['tenSP'];
      if (tenSP) {
        this.http
          .get('http://localhost:3800/sanpham/findSP/' + tenSP)
          .subscribe(
            (data: any[]) => {
              this.searchResults = data;
              console.log(this.searchResults);
              this.loading = false;
              this.loadData.setLoadingData(false);
            },
            (error) => {
              console.error(error);
            }
          );
      }
    });
  }
  detailPage() {
    this.route.params.subscribe((params) => {
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
    this.router.navigate(['/client/shopping-cart']);
  }
}
