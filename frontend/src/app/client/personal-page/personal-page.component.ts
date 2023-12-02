
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';


@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit{
  user:any
  activeIndex = 1;
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
