import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/services/API.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
  providers:[API]
})
export class PurchaseHistoryComponent {
  donhang:any
  user:any
  activeIndex = 1;
  onClickBtnMenu(index: number) {
    this.activeIndex = index;
  }
  constructor(public userService:UserServiceService, private router:Router,private http:HttpClient,private api:API){}

  ngOnInit(): void {

    this.user=this.userService.getUser()
    console.log(this.user)
    this.Finduser()
  }

  logOut(){
    this.userService.logOUt()
    this.router.navigate(['/client/homepage'])
  }
  Finduser(){
    this.http.get(this.api.getAPI()+'/donhang/showdonhang/'+this.user._id).subscribe((data:any)=>{
        console.log(data)
        this.donhang=data
    })
  }

  orderDetail(idDH: string){
    this.router.navigate(['/client/order/'+this.user._id+'/'+idDH])
  }
}
