import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-create-product',
  templateUrl: './form-create-product.component.html',
  styleUrls: ['./form-create-product.component.css'],
})
export class FormCreateProductComponent implements OnInit {
  tenHang: string = '';
  hinhAnhProduct: FormData;
  product: FormData;
  listHang: string[] = [];
  tenLoaiSP: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private route: ActivatedRoute,
    private productRoute: Router
  ) {
    console.log(this.data);
    this.tenLoaiSP = this.data;
  }
  readonly API = 'http://localhost:3800/';
  getAllHang() {
    this.http
      .post(this.API + 'hang/getAllHangFromCate', { tenLoaiSP: this.tenLoaiSP })
      .subscribe((data: any) => {
        data.forEach((element) => {
          console.log(element);
          this.listHang.push(element);
        });
      });
  }
  ngOnInit(): void {
    this.getAllHang();
  }

  createNewProduct(data: FormData) {
    this.product = data;
    this.product.append('tenLoaiSP', this.tenLoaiSP);
    this.product.append('tenHang', this.tenHang);
    this.http
      .post(this.API + 'sanpham/createNewProduct', this.product)
      .subscribe((data: any) => {
        console.log(data);
      });
    this.productRoute.navigate['/admin/products'];
  }
  pasteHinhAnh(data: FormData) {}
}
