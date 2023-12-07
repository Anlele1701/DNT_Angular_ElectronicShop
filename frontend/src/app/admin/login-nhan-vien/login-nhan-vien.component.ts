import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-nhan-vien',
  templateUrl: './login-nhan-vien.component.html',
  styleUrls: ['./login-nhan-vien.component.css'],
})
export class LoginNhanVienComponent {
  static isLoggedIn = false;
  email = '';
  password = '';
  loginResult: any;
  isLoggedIn = false;
  constructor(private router: Router, private http: HttpClient) {}
  login() {
    this.http
      .post('http://localhost:3800/nhanvien/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (data: any) => {
          this.loginResult = data;
          if (data.status === 200) {
            LoginNhanVienComponent.isLoggedIn = true;
            this.router.navigate(['/admin']);
          }
        },
        (error) => {
          console.error('Lỗi ', error);
        }
      );
  }
}
