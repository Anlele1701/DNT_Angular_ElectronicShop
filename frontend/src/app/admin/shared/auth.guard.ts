import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginNhanVienComponent } from '../login-nhan-vien/login-nhan-vien.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/loginAdmin']); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      return false;
    }
  }
}
