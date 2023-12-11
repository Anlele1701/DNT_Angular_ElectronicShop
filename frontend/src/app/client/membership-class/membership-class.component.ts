import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
@Component({
  selector: 'app-membership-class',
  templateUrl: './membership-class.component.html',
  styleUrls: ['./membership-class.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MembershipClassComponent {
  user:any;
  activeIndex = 3;
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
