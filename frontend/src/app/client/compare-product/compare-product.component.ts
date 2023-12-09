import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrls: ['./compare-product.component.css'],
})
export class CompareProductComponent implements OnInit {
  products: any[] = [];
  product1: any;
  product2: any;
  category: string;
  selectedProducts1: string = '';
  selectedProducts2: string = '';
  mess: string = '';
  apiUrl = 'http://localhost:3800';
  constructor(private http: HttpClient, private routeActived: ActivatedRoute) {}
  ngOnInit(): void {
    this.routeActived.params.subscribe((params) => {
      this.category = params['loaiSP'];
      console.log(this.category);
      this.getProductFormCategory(this.category);
    });
  }
  getProductForCompare(product1: string, product2: string) {
    if (!product1 || !product2) {
      this.mess = `Vui lòng chọn ${this.category} muốn so sánh`;
    } else {
      this.mess = '';
    }
    this.http
      .post(this.apiUrl + `/sanpham/compare/${this.category}`, {
        product1,
        product2,
      })
      .subscribe((data: any) => {
        this.product1 = data.product1;
        this.product2 = data.product2;
        console.log(this.product1, this.product2);
      });
  }
  getProductFormCategory(category: string) {
    this.http
      .get<any[]>(this.apiUrl + `/sanpham/${category}`)
      .subscribe((data: any) => {
        this.products = data;
        console.log(this.products);
      });
  }
  getImageUrl(fileName: string) {
    return `${this.apiUrl}/images/${fileName}`;
  }
}
