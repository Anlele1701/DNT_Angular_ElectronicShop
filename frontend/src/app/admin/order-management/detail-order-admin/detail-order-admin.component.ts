import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-detail-order-admin',
  templateUrl: './detail-order-admin.component.html',
  styleUrls: ['./detail-order-admin.component.css'],
  providers: [API]
})
export class DetailOrderAdminComponent implements OnInit{
  constructor(private api: API, private http: HttpClient, private activeRoute: ActivatedRoute){}
  idKH: string
  idDH: string
  CTDH:any
  listSP:any[]=[]
  getParams(){
    this.activeRoute.params.subscribe(params=>{
      this.idKH=params['idKH']
      this.idDH=params['idDH']
    })
  }
  getCTDH(){
    this.http.get(this.api.getAPI()+'/donhang/getCTDH/'+this.idKH+'/'+this.idDH).subscribe((data:any)=>{
      this.CTDH=data
      console.log(this.CTDH)
      this.getListSP()
    })
  }

  getListSP(){
    this.CTDH.CTDH.forEach(item=>{
      this.http.get(this.api.getAPI()+'/sanpham/getSP/'+item.idSP).subscribe((data:any)=>{
        this.listSP.push({
          sp:data,
          soLuong: item.soLuongMua,
          thanhTien:item.thanhTien
        })
      })
    })
    console.log(this.listSP)
  }

  ngOnInit(): void {
    this.getParams()
    this.getCTDH()
  }
}
