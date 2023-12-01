import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import {
  Observable,
  Subject,
  catchError,
  map,
  takeUntil,
  throwError,
} from 'rxjs';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  brandList$: Observable<any[]>;
  private destroy$: Subject<void> = new Subject<void>();
  stringLoaiSP: string = '';
  constructor(private http: HttpClient) {}
  brandName: string = '';
  brandList: any[] = [];
  readonly API = 'http://localhost:3800';
  createNewBrand() {
    this.http
      .post(this.API + '/hang/createNewHang', { tenHang: this.brandName })
      .pipe(
        catchError((error) => {
          console.error('Lỗi khi tạo mới thương hiệu:', error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        console.log(this.brandName);
        this.refreshBrandList();
      });
  }
  private refreshBrandList() {
    this.showAllBrand(); // Cập nhật brandList$ sau khi tạo mới hoặc xóa một thương hiệu
  }

  showAllBrand() {
    this.brandList$ = this.http.get(this.API + '/hang/getAllHang').pipe(
      map((data: any) => {
        console.log(data);
        return data;
      }),
      catchError((error) => {
        console.error('Lỗi khi lấy danh sách thương hiệu:', error);
        return throwError(error);
      }),
      takeUntil(this.destroy$)
    );
  }
  deleteBrand(idSP) {
    this.http
      .delete(this.API + '/hang/delete/' + idSP)
      .pipe(
        catchError((error) => {
          console.error('Lỗi khi xóa thương hiệu:', error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.refreshBrandList();
      });
  }

  ngOnInit(): void {
    this.showAllBrand();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  returnStringLoaiSP(itemHang) {
    this.stringLoaiSP = '';
    itemHang.forEach((item) => {
      this.stringLoaiSP = this.stringLoaiSP + item + ', ';
    });
    return this.stringLoaiSP;
  }
}
