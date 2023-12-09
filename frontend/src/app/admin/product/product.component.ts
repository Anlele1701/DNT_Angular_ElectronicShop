import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  pipe,
  take,
  takeUntil,
} from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BanPhimFormComponent } from '../thongSoForm/ban-phim-form/ban-phim-form.component';
import { ChuotFormComponent } from '../thongSoForm/chuot-form/chuot-form.component';
import { LapTopFormComponent } from '../thongSoForm/lap-top-form/lap-top-form.component';
import { ManHinhFormComponent } from '../thongSoForm/man-hinh-form/man-hinh-form.component';
import { TaiNgheFormComponent } from '../thongSoForm/tai-nghe-form/tai-nghe-form.component';
import { DienThoaiFormComponent } from '../thongSoForm/dien-thoai-form/dien-thoai-form.component';
import { FormCreateProductComponent } from '../form-create-product/form-create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoadDataService } from '../shared/load-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  nameProduct: String = '';
  listProduct$: Observable<any[]>;
  private unsubscribe$ = new Subject<void>();
  searchTerm = '';

  readonly API = 'http://localhost:3800/';
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private popup: MatDialog,
    private isLoading: LoadDataService
  ) {}
  ngOnInit(): void {
    this.loadData();
    console.log(this.nameProduct);
    console.log(this.searchTerm);
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
    this.isLoading.setLoadingData(true);
    const listProductSubject = new BehaviorSubject<any[]>([]);

    this.http
      .post(this.API + 'sanpham/getAllSanPham', {
        nameProductCate: this.nameProduct,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          listProductSubject.next(data);
          //this.listProduct = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching data', error);
        },
        () => {
          this.isLoading.setLoadingData(false);
        }
      );
    this.listProduct$ = listProductSubject.asObservable();
  }
  onSearch() {
    console.log(this.nameProduct);
    console.log(this.searchTerm);
    if (this.searchTerm.trim() !== '') {
      const searchResultSubject = new BehaviorSubject<any[]>([]);

      this.http
        .get(
          this.API + 'sanpham/find/' + this.nameProduct + '/' + this.searchTerm
        )
        .subscribe(
          (data: any) => {
            console.log(data);
            searchResultSubject.next(data);
          },
          (error) => {
            console.log(error);
          },
          () => {}
        );

      this.listProduct$ = searchResultSubject.asObservable();
    } else {
      this.loadData();
    }
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
    this.popup.open(FormCreateProductComponent, {
      data: this.nameProduct,
    });
  }
  // functions
  private productListSource = new BehaviorSubject<any[]>([]);
  productList$ = this.productListSource.asObservable();

  updateProductList(products: any[]) {
    this.productListSource.next(products);
  }

  changeToEditProductPage(idSP: string) {
    this.router.navigate([
      '/admin/edit-product/' + this.nameProduct + '/' + idSP,
    ]);
  }

  deleteProduct(idSP: string, tenHang: string) {
    this.http
      .delete(
        this.API +
          'sanpham/deleteProduct/' +
          this.nameProduct +
          '/' +
          tenHang +
          '/' +
          idSP
      )
      .subscribe((data: any) => {
        console.log(data);
        window.location.reload();
      });
  }
  AddFormVisible: boolean = false;

  toggleAddForm() {
    this.AddFormVisible = !this.AddFormVisible;
  }
  hideAddForm() {
    this.AddFormVisible = false;
  }
}
