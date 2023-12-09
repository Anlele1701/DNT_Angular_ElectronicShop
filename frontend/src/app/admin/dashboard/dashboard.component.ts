import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { count } from 'rxjs';
import { API } from 'src/app/services/API.service';
import { LoadDataService } from '../shared/load-data.service';
import { AdminDashboardService } from 'src/app/services/AdminDashboard/admin-dashboard.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [HighchartsChartModule, CommonModule],
  providers: [API],
})
export class DashboardComponent implements OnInit {
  piechart: any;
  piechart2: any;
  spchart: any;
  highcharts: typeof Highcharts = Highcharts;
  API: string = '';
  countSP: number = 0;
  countKH: number = 0;
  total:number =0;
  totalDH: number =0;

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
    this.getSanPham();
    this.getTotalMoney();
  }
  // LOAISP CHART
  getLoaiSP() {
    this.loadData.setLoadingData(true);
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
      this.tenHangSP.push(tenHang);
      element.cacHang.forEach((element2: any) => {
        test += element2.idCacSP.length;
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
  // SANPHAM CHART
  getSanPham() {
    this.adminDashboard.getSanPham().subscribe((data: any) => {
      this.drawSanPham(data);
    });
  }
  drawSanPham(data: any) {
    var seriesData = [];
    var countsByTenHang = new Map<string, number>();
    data.forEach((element: any) => {
      var tenHang = element.tenHang;
      if (countsByTenHang.has(tenHang)) {
        countsByTenHang.set(tenHang, countsByTenHang.get(tenHang) + 1);
      } else {
        countsByTenHang.set(tenHang, 1);
      }
    });
    countsByTenHang.forEach((count, tenHang) => {
      seriesData.push({
        name: tenHang,
        y: count,
      })
    });
    // CHART
    this.spchart = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Biểu đồ thể hiện cơ cấu sản phẩm trong hãng',
      },
      series: [{
        data: seriesData,
        name: 'Số lượng sản phẩm'
      }]
    };
  }
  // BE
  getCountSP(){
    this.http.get(this.API+'/sanpham/countSP').subscribe((data:any)=>
    {
      this.countSP = data.result;
    })
  }
  getTotalMoney() { 
    let total =0;
    let totalDH = 0;
    this.http.get(this.API+'/donhang/getAllDonHang').subscribe(
      (data: any) => {
        data.forEach((element:any)=>{
          totalDH += element.cacDH.length;
          element.cacDH.forEach((element2:any)=>{
            total += element2.tongTien;
          }); 
        })    
        this.totalDH = totalDH;
        this.total = total;     
      },
      (error) => {
        console.log(error);
      },
    );
  }
  getCountKH() {
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
