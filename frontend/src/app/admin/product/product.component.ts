import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject, filter, pipe, take, takeUntil } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
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
    private cdr: ChangeDetectorRef
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
    console.log(nameProduct);
    this.router.navigate([`/admin/createNewProduct`, nameProduct]);
  }
  // functions
  private productListSource = new BehaviorSubject<any[]>([]);
  productList$ = this.productListSource.asObservable();

  updateProductList(products: any[]) {
    this.productListSource.next(products);
  }

  changeToEditProductPage(idSP: string){
    this.router.navigate(['/admin/edit-product/'+this.nameProduct+'/'+idSP])
  }

  deleteProduct(idSP: string, tenHang: string){
    this.http.delete(this.API+'sanpham/deleteProduct/'+this.nameProduct+'/'+tenHang+'/'+idSP).subscribe((data:any) => {
      console.log(data)
      window.location.reload()
    });
  }
}
