import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { count } from 'rxjs';
import { API } from 'src/app/services/API.service';
import { LoadDataService } from '../shared/load-data.service';
import { AdminDashboardService } from 'src/app/services/AdminDashboard/admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [HighchartsChartModule],
  providers: [API],
})
export class DashboardComponent implements OnInit {
  piechart: any;
  highcharts: typeof Highcharts = Highcharts;
  API: string = '';
  countSP: number = 0;
  countKH: number = 0;
  // piechart
  loaiSP: any[] =[];
  countLoaiSP: any[]=[];

  constructor(
    private api: API,
    public http: HttpClient,
    private loadData: LoadDataService,
    private adminDashboard: AdminDashboardService
  ) {
    this.API = api.getAPI();
  }
  ngOnInit(): void {
    this.getCountSP();
    this.getCountKH();
    this.getLoaiSP();
    this.getLoaiSP();
  }
  // PIE CHART
  getLoaiSP(){
    this.adminDashboard.getLoaiSP().subscribe((data:any)=>{
      this.drawLoaiSP(data);
    })
  }
  drawLoaiSP(data:any){
    var seriesData =[];
    data.forEach((element: any)=>{
      this.loaiSP.push(element.tenLoai); 
      this.countLoaiSP.push(element.cacHang.length);
      seriesData.push({
        name:element.tenLoai,
        y:element.cacHang.length,});
    });
    // LOAISP 
    this.piechart = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Biểu đồ thể hiện cơ cấu sản phẩm trong loại sản phẩm',
      },
      series: [{
        name: 'Số lượng sản phẩm', 
        data: seriesData,
      }]
    };
  }
  //data

  // BE
  getCountSP() {
    this.loadData.setLoadingData(true);
    this.http.get(this.API + '/sanpham/countSP').subscribe(
      (data: any) => {
        this.countSP = data.result;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.loadData.setLoadingData(false);
      }
    );
  }
  getCountKH() {
    this.loadData.setLoadingData(true);
    this.http.get(this.API + '/khachhang/countKH').subscribe(
      (data: any) => {
        this.countKH = data.result;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.loadData.setLoadingData(false);
      }
    );
  }
}
