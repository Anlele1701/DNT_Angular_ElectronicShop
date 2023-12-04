import { UserServiceService } from './../../services/userService/user-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-regis',
  templateUrl: './login-regis.component.html',
  styleUrls: ['./login-regis.component.css'],
})
export class LoginRegisComponent {
  @ViewChild('container') container: any;
  //model
  name: string = '';
  email: string = '';
  sdt: string = '';
  matKhau: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private UserService: UserServiceService,
  ) {}
  readonly API = 'http://localhost:3800/';
  ngAfterViewInit() {
    const overlayBtn =
      this.container.nativeElement.querySelector('.overlayBtn');
    const overLayCon =
      this.container.nativeElement.querySelector('.overlayCon');
    overlayBtn.addEventListener('click', () => {
      this.container.nativeElement.classList.toggle('right-panel-active');
      overlayBtn.classList.remove('btnScaled');
      window.requestAnimationFrame(() => {
        overlayBtn.classList.add('btnScaled');
      });
    });
  }

  submitFormRegis() {
    this.http
      .post(this.API + 'khachhang/dangKy', {
        name: this.name,
        email: this.email,
        sdt: this.sdt,
        password: this.matKhau,
      })
      .subscribe((data: any) => {
        if (data.emailExisted) {
          console.log(data.emailExisted);
        } else console.log('Success');
      });
  }

  submitFormLogin(){
    this.http.post(this.API+'khachhang/dangNhap',{email:this.email,password:this.matKhau}).subscribe((data:any)=>{
      if(data.invalid)
      {
        console.log(data.invalid)
      }
      else{
        console.log(data)
        this.UserService.setUser(data)
        let route=this.router.url
        if(route==='/client/shopping-cart'){
          this.router.navigate(['/client/purchase'])
        }
        else this.router.navigate(['/client/personal'])
      }
    })
  }
}
