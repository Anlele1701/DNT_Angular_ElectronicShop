import { API } from '../../../services/API.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [API],
})
export class EditProductComponent implements OnInit {
  loaiSP: string = '';
  listHang: string[] = [];
  hangCu: string = '';
  product: any = null;
  idSP: string = '';
  formEdit: FormData = new FormData();
  hinhAnhList: FileList | null = null;
  selectedImage: any[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private API: API
  ) {}
  getNameProduct() {
    this.activeRoute.paramMap.subscribe((params) => {
      this.loaiSP = params.get('loaiSP');
      this.idSP = params.get('idSP');
    });
  }
  getAllHang() {
    this.http
      .post(this.API.getAPI() + '/hang/getAllHangFromCate', {
        tenLoaiSP: this.loaiSP,
      })
      .subscribe((data: any) => {
        data.forEach((element) => {
          console.log(element);
          this.listHang.push(element);
        });
      });
  }
  getProduct() {
    this.http
      .get(this.API.getAPI() + '/sanpham/getSP/' + this.idSP)
      .subscribe((data: any) => {
        this.product = data;
        this.hinhAnhList = this.product.hinhAnh;
        this.hangCu = this.product.tenHang;
        console.log(this.product);
      });
  }

  getImage(event: any) {
    for (let item of event.target.files) {
      const file: File = item;
      var itemImage = {
        tenImageSP: file.name,
        dataImageSP: file.size,
        contentTypeSP: file.type,
      };
      this.hinhAnhList = event.target.files;
      this.selectedImage.push(itemImage);
    }
    this.product.hinhAnh = this.selectedImage;
  }

  editProduct() {
    console.log(this.product);
    const pro = new FormData();
    for (let i = 0; i < this.hinhAnhList.length; i++) {
      pro.append('hinhAnh', this.hinhAnhList[i]);
    }
    console.log(this.product.hinhAnh);
    pro.append('product', JSON.stringify(this.product));
    pro.append('loaiSP', this.loaiSP);
    pro.append('tenHang', this.hangCu);
    this.http
      .post(this.API.getAPI() + '/sanpham/editSanPham', pro)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/admin/products/' + this.loaiSP]);
      });
  }

  ngOnInit(): void {
    this.getNameProduct();
    this.getAllHang();
    this.getProduct();
  }
}
