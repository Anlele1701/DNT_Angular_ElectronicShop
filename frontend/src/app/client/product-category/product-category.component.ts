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
import { LoadingIndicatorService } from 'src/app/services/loading-indicator.service';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  providers: [API],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductCategoryComponent implements OnInit {
  listproduct: any[] = [];
  listBrand: string[] = [];
  findListProduct: any[]=[]; //danh sách sản phẩm sau khi tìm được
  findListBrand:string[]=[]; //danh sách hãng muốn tìm
  loaiSP: string = '';
  loading: boolean = true;
  requests = [];
  pageSize = 9; //số lượng sản phẩm trong 1 trang
  currentPage = 1;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private api: API,
    private loadData: LoadingIndicatorService
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
  getAllProduct() {
    this.loadData.setLoadingData(true);
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

          forkJoin(this.requests).subscribe(() => {
            this.loading = false;
            this.loadData.setLoadingData(false);
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
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
    this.findListProduct=this.listproduct
  }
  checkBrand(event:any, item: string){
    if(event.target.checked==true)
    {
      this.findListBrand.push(item)
    }
    else{
      const index=this.findListBrand.findIndex(brand=>brand===item)
      this.findListBrand.splice(index,1)
    }
    this.updateListProduct()
  }

  updateListProduct(){
      if(this.findListBrand.length===0)
      {
        this.findListProduct=this.listproduct
      }
      else{
        this.findListProduct=[]
        this.findListBrand.forEach(item=>{
          this.listproduct.forEach(product=>{
            if(product.tenHang===item) this.findListProduct.push(product)
          })
        })
      }
      this.currentPage=1
  }
}
