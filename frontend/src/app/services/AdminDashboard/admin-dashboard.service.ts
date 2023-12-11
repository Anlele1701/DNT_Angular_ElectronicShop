import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http: HttpClient) { }
  getLoaiSP():Observable<any>{
    return this.http.get<any>('http://localhost:3800/loaisp/getAll');
  }
  getSanPham():Observable<any>{
    return this.http.get<any>('http://localhost:3800/sanpham/getAll');
  }
}
