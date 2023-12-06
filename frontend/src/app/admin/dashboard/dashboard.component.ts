import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { count } from 'rxjs';
import { API } from 'src/app/services/API.service';
import { LoadDataService } from '../shared/load-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [HighchartsChartModule],
  providers: [API],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  chartOptions: any;
  highcharts: typeof Highcharts = Highcharts;
  API: string = '';
  countSP: number = 0;
  countKH: number = 0;
  constructor(
    private api: API,
    public http: HttpClient,
    private loadData: LoadDataService
  ) {
    this.API = api.getAPI();
  }
  ngOnInit(): void {
    this.barChart();
    this.getCountSP();
    this.getCountKH();
  }
  ngAfterViewInit(): void {}
  // CHART
  barChart() {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Testing',
      },
      subtitle: {
        text: 'phu de',
      },
      xAxis: {
        cate: ['VietName', 'vietName', 'trung quoc', 'nga'],
      },
      series: this.chartData,
    };
  }
  //data
  chartData = [
    {
      name: 'Year 1990',
      data: [631, 727, 3202, 721],
    },
    {
      name: 'Year 2000',
      data: [814, 841, 3714, 726],
    },
    {
      name: 'Year 2018',
      data: [1276, 1007, 4561, 746],
    },
  ];

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
        console.log(this.countKH);
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
