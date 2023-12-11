
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/services/API.service';
import { UserServiceService } from 'src/app/services/userService/user-service.service';


@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css'],
  providers:[API]
})
export class PersonalPageComponent implements OnInit{
  user:any
  activeIndex = 0;
  onClickBtnMenu(index: number) {
    this.activeIndex = index;
  }
  countDH:number=0
  constructor(public userService:UserServiceService, private router:Router, private http:HttpClient, private api:API){}

  ngOnInit(): void {
    this.user=this.userService.getUser()
    console.log(this.user)
    this.getAllDH()
  }

  getAllDH(){
    this.http.get(this.api.getAPI()+'/donhang/showdonhang/'+this.user._id).subscribe((data:any)=>{
      data.forEach(item=>{
        this.countDH++
      })
    })
  }

  logOut(){
    this.userService.logOUt()
    this.router.navigate(['/client/homepage'])
  }
}
