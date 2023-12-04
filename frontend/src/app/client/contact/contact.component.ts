import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  user:any
  activeIndex = 4;
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
