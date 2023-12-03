import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject, filter, pipe, take, takeUntil } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BanPhimFormComponent } from '../thongSoForm/ban-phim-form/ban-phim-form.component';
import { ChuotFormComponent } from '../thongSoForm/chuot-form/chuot-form.component';
import { LapTopFormComponent } from '../thongSoForm/lap-top-form/lap-top-form.component';
import { ManHinhFormComponent } from '../thongSoForm/man-hinh-form/man-hinh-form.component';
import { TaiNgheFormComponent } from '../thongSoForm/tai-nghe-form/tai-nghe-form.component';
import { DienThoaiFormComponent } from '../thongSoForm/dien-thoai-form/dien-thoai-form.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  nameProduct: String = '';
  listProduct: any[] = [];
  isLoading = false;
  private unsubscribe$ = new Subject<void>();

  readonly API = 'http://localhost:3800/';
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private popup: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private loadData() {
    this.route.paramMap.subscribe((params) => {
      this.nameProduct = params.get('nameProduct');
      this.getProductFromCate();
    });
  }
  getProductFromCate() {
    this.isLoading = true;
    this.http
      .post(this.API + 'sanpham/getAllSanPham', {
        nameProductCate: this.nameProduct,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          this.listProduct = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching data', error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  getFormCreateProductPage(nameProduct: String) {
    this.router.navigate([`/admin/createNewProduct`, nameProduct]);
    this.nameProduct = nameProduct;
    console.log(this.nameProduct);
  }
  //Điện Thoại
  //Laptop
  //Màn Hình
  //Bàn Phím
  //Chuột
  //Tai Nghe
  openForm() {
    var nameComponent;
    if (this.nameProduct === 'Màn Hình') {
      nameComponent = ManHinhFormComponent;
    } else if (this.nameProduct === 'Laptop') {
      nameComponent = LapTopFormComponent;
    } else if (this.nameProduct === 'Điện Thoại') {
      nameComponent = DienThoaiFormComponent;
    } else if (this.nameProduct === 'Chuột') {
      nameComponent = ChuotFormComponent;
    } else if (this.nameProduct === 'Bàn Phím') {
      nameComponent = BanPhimFormComponent;
    } else if (this.nameProduct === 'Tai Nghe') {
      nameComponent = TaiNgheFormComponent;
    }
    this.popup.open(nameComponent);
  }
  // functions
  private productListSource = new BehaviorSubject<any[]>([]);
  productList$ = this.productListSource.asObservable();

  updateProductList(products: any[]) {
    this.productListSource.next(products);
  }
  AddFormVisible: boolean = false;

  toggleAddForm() {
    this.AddFormVisible = !this.AddFormVisible;
  }
  hideAddForm() {
    this.AddFormVisible = false;
  }
}
