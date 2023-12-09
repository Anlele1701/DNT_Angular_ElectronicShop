import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-nhan-vien',
  templateUrl: './login-nhan-vien.component.html',
  styleUrls: ['./login-nhan-vien.component.css'],
})
export class LoginNhanVienComponent implements OnInit {
  email = '';
  password = '';
  loginResult: any;
  admin: any;
  constructor(private router: Router, private http: HttpClient) {}
  setAdmin(admin: any) {
    this.admin = admin;
    localStorage.setItem('admin', JSON.stringify(this.admin));
  }
  login() {
    this.http
      .post('http://localhost:3800/nhanvien/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.loginResult = data;
        if (data.status === 200) {
          this.setAdmin(data);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/admin/dashboard']);
        }
      });
  }
  ngOnInit(): void {}
  // Review again
  // private verifyToken(token: string) {
  //   console.log('Bắt đầu verifyToken');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   this.http
  //     .post('http://localhost:3800/nhanvien/verifyToken', {}, { headers })
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       if (data) {
  //         // Token hợp lệ giữ người dùng
  //         LoginNhanVienComponent.isLoggedIn = true;
  //         this.router.navigate(['/admin']);
  //       }
  //     });
  // }
}
