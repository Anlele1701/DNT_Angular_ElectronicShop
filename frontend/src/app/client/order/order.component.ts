import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute,Router} from '@angular/router';
import { API } from 'src/app/services/API.service';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[API]
})
export class OrderComponent {
  constructor(private router:Router , private api: API, private http: HttpClient, private activeRoute: ActivatedRoute, private matdialog:MatDialog){}
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


  updateInfoOrder(){
    const dialogRef=this.matdialog.open(EditOrderComponent,{
      data: {
        idKH: this.idKH,
        idDH:this.idDH,
        ttThanhToan:this.CTDH.trangThaiTT,
        nguoiNhan:this.CTDH.nguoiNhan,
        sdt: this.CTDH.sdt,
        diaChi:this.CTDH.diaChi
      }
    })
    dialogRef.afterClosed().subscribe((result)=>{
      if(result==='Update Successfully!')
      {
        console.log(result)
        window.location.reload()
      }
    })
  }


  cancelOrder(){
    const dialogRef=this.matdialog.open(CancelOrderComponent,{
      data: {
        idKH: this.idKH,
        idDH:this.idDH
      }
    })
    dialogRef.afterClosed().subscribe((result)=>{
      if(result==='Update Successfully!')
      {
        console.log(result)
        window.location.reload()
      }
    })
  }

  recoveryOrder(){
    this.http.patch(this.api.getAPI()+'/donhang/khoiPhucDonHang',{infoOrder:{idKH: this.idKH, idDH:this.idDH}}).subscribe((data:any)=>{
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getParams()
    this.getCTDH()
  }
  Gobackpage(){
    this.router.navigate(['/client/purchase-history'])
  }
}
