import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.css']
})
export class YourAccountComponent {
  user:any
  activeIndex = 2;
  onClickBtnMenu(index: number) {
    this.activeIndex = index;
  }
  constructor(public userService:UserServiceService, private router:Router){}

  ngOnInit(): void {
    this.user=this.userService.getUser()
    console.log(this.user)
  }

  logOut(){
    this.userService.logOUt()
    this.router.navigate(['/client/homepage'])
  }
}
