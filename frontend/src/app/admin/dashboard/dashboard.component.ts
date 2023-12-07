import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  piechart2: any;
  highcharts: typeof Highcharts = Highcharts;
  API: string = '';
  countSP: number = 0;
  countKH: number = 0;
  // piechart
  tenHangSP: any[] = [];
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
  }
  // LOAISP CHART
  getLoaiSP() {
    this.adminDashboard.getLoaiSP().subscribe((data: any) => {
      this.drawLoaiSP(data);
      this.drawSPinLoaiSP(data);
    });
  }
  drawLoaiSP(data: any) {
    var seriesData = [];
    data.forEach((element: any) => {
      seriesData.push({
        name: element.tenLoai,
        y: element.cacHang.length,
      });
    });
    // LOAISP
    this.piechart = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Biểu đồ thể hiện cơ cấu hãng trong loại sản phẩm',
      },
      series: [
        {
          name: 'Số lượng hãng',
          data: seriesData,
        },
      ],
    };
  }
  drawSPinLoaiSP(data: any) {
    var seriesData = [];
    data.forEach((element: any) => {
      var tenHang = element.tenLoai;
      var test = 0;
      console.log(tenHang);
      this.tenHangSP.push(tenHang);
      element.cacHang.forEach((element2: any) => {
        test += element2.idCacSP.length;
        console.log(test);
      });
      seriesData.push({  
        name: tenHang,
        data: [test],
      });
    });
    // LOAISP
    this.piechart2 = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Biểu đồ thể hiện cơ cấu sản phẩm trong loại sản phẩm',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
       series: seriesData,
    };
  }
  // 
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
