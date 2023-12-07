import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginNhanVienComponent } from '../login-nhan-vien/login-nhan-vien.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isLoggedIn = false;

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (LoginNhanVienComponent.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/loginAdmin']); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      return false;
    }
  }
}
