import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts' ;
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [HighchartsChartModule],
})
export class DashboardComponent implements OnInit{
  chartOptions: any;
  highcharts: typeof Highcharts = Highcharts;

  constructor(){}
  ngOnInit(): void {
    this.barChart();
  }
  barChart(){
    this.chartOptions={
      chart:{
        type:'column'
      },
      title:{
        text:'Testing'
      },
      subtitle:{
        text:'phu de'
      },
      xAxis:{
        cate:[
          'VietName', 'vietName','trung quoc','nga'
        ]
      },
      series: this.chartData
    }
  }
  //data
  chartData =[
    {
      name:'Year 1990',
      data:[631,727,3202,721]
    },
    {
      name:'Year 2000',
      data:[814,841,3714,726]
    },
    {
      name:'Year 2018',
      data:[1276,1007, 4561, 746]
    }
  ]
}
