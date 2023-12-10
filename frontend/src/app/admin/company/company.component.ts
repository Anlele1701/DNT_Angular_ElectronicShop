import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, flatMap } from 'rxjs';
import { LoadDataService } from '../shared/load-data.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../shared/AdminIndex.css'],
})
export class CompanyComponent implements OnInit {
  stringLoaiSP: string = '';
  constructor(private http: HttpClient, private loadData: LoadDataService) {}
  brandName: string = '';
  brandList: any[] = [];
  deleted: boolean;
  notdelted: boolean;
  brandList$: Observable<any[]>;
  tenNhaSX: string = '';
  brandID: any;
  items: any[] = [];
  searchTerm = '';
  allHang: string[] = [
    'Điện Thoại',
    'Màn Hình',
    'Laptop',
    'Bàn Phím',
    'Chuột',
    'Tai Nghe',
  ];
  cacLoaiSP: { [key: string]: boolean } = {};

  readonly API = 'http://localhost:3800';
  createNewBrand() {
    this.http
      .post(this.API + '/hang/createNewHang', { tenHang: this.brandName })
      .pipe(flatMap(async () => this.showAllBrand()))
      .subscribe((data: any) => {
        this.showAllBrand();
      });
  }
  showAllBrand() {
    this.loadData.setLoadingData(true);
    const brandListSubject = new BehaviorSubject<any[]>([]);
    this.http.get(this.API + '/hang/getAllHang').subscribe(
      (data: any) => {
        brandListSubject.next(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.loadData.setLoadingData(false);
      }
    );
    this.brandList$ = brandListSubject.asObservable();
  }
  deleteBrand(idSP) {
    this.http
      .delete(this.API + '/hang/delete/' + idSP)
      .subscribe((data: any) => {
        if (data.status) {
          this.showAllBrand();
          this.deleted = true;
        } else {
          console.log(data.status);
          this.notdelted = true;
        }
      });
  }
  updateBrand(data: any) {
    this.tenNhaSX = data.tenNhaSX;
    this.brandID = data._id;
    this.allHang.forEach((item) => {
      this.cacLoaiSP[item] = data.cacLoaiSP.includes(item);
    });
  }
  updateDB() {
    var selectedLoaiSP = Object.keys(this.cacLoaiSP).filter(
      (key) => this.cacLoaiSP[key]
    );
    let data = {
      tenNhaSX: this.tenNhaSX,
      cacLoaiSP: selectedLoaiSP,
    };
    this.http
      .patch(this.API + '/hang/update' + '/' + this.brandID, data)
      .subscribe(
        (result) => {
          console.log(result);
          alert('Cập nhật thành công!');
          this.showAllBrand();
        },
        (error) => {
          console.error('Error updating data:', error);
        }
      );
  }
  ngOnInit(): void {
    this.showAllBrand();
  }
  // FUNCTIONS
  AddFormVisible: boolean = false;
  toggleAddForm() {
    this.AddFormVisible = !this.AddFormVisible;
  }
  hideAddForm() {
    this.AddFormVisible = false;
  }
  returnStringLoaiSP(itemHang) {
    this.stringLoaiSP = '';
    itemHang.forEach((item) => {
      this.stringLoaiSP = this.stringLoaiSP + item + ', ';
    });
    return this.stringLoaiSP;
  }
  onSearch() {
    if (this.searchTerm.trim() !== '') {
      const searchResultSubject = new BehaviorSubject<any[]>([]);

      this.http.get(this.API + '/hang/find/' + this.searchTerm).subscribe(
        (data: any) => {
          searchResultSubject.next(data);
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );

      this.brandList$ = searchResultSubject.asObservable();
    } else {
      this.showAllBrand();
    }
  }
}
