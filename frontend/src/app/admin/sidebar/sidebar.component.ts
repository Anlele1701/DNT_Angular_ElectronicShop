import { map } from 'rxjs/operators';
import {Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginNhanVienComponent } from '../login-nhan-vien/login-nhan-vien.component';
import { LoadDataService } from '../shared/load-data.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private loadData: LoadDataService) {}
  activeindex = 0;
  isExpanded = false;
  countLoaiSP: number = 0;
  listLoaiSP: any[] = [];
  isLoading$ = this.loadData.loadingData$;
  admin:any
  readonly API = 'http://localhost:3800';
  onClickSideBar(index: number) {
    // Mỗi khi thao tác click 1 index bất kì thì dropdown sẽ tắt đi
    const collapse = document.querySelectorAll('.collapse');
    collapse.forEach((element) => {
      element.classList.remove('show');
    });
    this.activeindex = index;
  }
  countAllLoaiSP() {
    this.http.get(this.API + '/loaisp/countLoaiSP').subscribe((data: any) => {
      this.countAllLoaiSP = data.sumLoaiSP;
      this.listLoaiSP = data.listLoaiSP;
    });
  }
  getAdminInfo(){
    this.admin=JSON.parse(localStorage.getItem('admin'));
    console.log(this.admin.data)
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }
  ngOnInit(): void {
    this.countAllLoaiSP();
    this.getAdminInfo();
  }
  changeToProductPage(item: string) {
    this.router.navigate(['/admin/products', item]);
  }
}
