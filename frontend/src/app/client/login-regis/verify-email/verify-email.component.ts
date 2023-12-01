import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit{

  constructor(private http:HttpClient, private activeRoute:ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
    this.verifiedSuccess()
  }

  verifiedSuccess(){
    const token=this.activeRoute.snapshot.params['token'];
    console.log(token)
    this.http.get('http://localhost:3800/khachhang/verifyEmail/:'+token).subscribe((data:any)=>{
      console.log('Verified your gmail successfully!')
    })
  }

  changeToLoginPage(){
    this.router.navigate(['/regis-login']);
  }
}
