import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { API } from 'src/app/services/API.service';
import { async, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadDataService } from 'src/app/admin/shared/load-data.service';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  providers: [API],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductCategoryComponent implements OnInit, AfterViewInit {
  listproduct: any[] = [];
  listBrand: string[] = [];
  loaiSP: string = '';
  loading: boolean = true;
  requests = [];
  pageSize = 9; //số lượng sản phẩm trong 1 trang
  currentPage = 1;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private api: API,
    private loadData: LoadDataService,
  ) {}
  ngOnInit() {
    this.checkUrlLoaiSP();
    this.getAllProduct();
  }

  checkUrlLoaiSP() {
    this.activatedRoute.params.subscribe((params) => {
      this.loaiSP = params['loaiSP'];
    });
  }
  ngAfterViewInit() {
    this.loadData.setLoadingData(false);
  }
  getAllProduct() {
    this.http
      .get(this.api.getAPI() + '/sanpham/getAllSanPham/' + this.loaiSP)
      .subscribe(
        (data: any) => {
          data.cacHang.forEach((item) => {
            this.getHang(item.idHang);
            item.idCacSP.forEach((idSP) => {
              this.getSP(idSP);
            });
          });
        });

        forkJoin(this.requests).subscribe(() => {
          //hoàn thành load tất cả dữ liệu rồi mới show
          this.loading = false;
        });
      };
  getHang(idHang) {
    this.requests.push(
      this.http.get(this.api.getAPI() + '/hang/getHang/' + idHang).pipe(
        map((hangData: any) => {
          this.listBrand.push(hangData.tenNhaSX);
        })
      )
    );
  }
  getSP(idSP) {
    this.requests.push(
      this.http.get(this.api.getAPI() + '/sanpham/getSP/' + idSP).pipe(
        map((spData: any) => {
          this.listproduct.push(spData);
        })
      )
    );
  }
}
