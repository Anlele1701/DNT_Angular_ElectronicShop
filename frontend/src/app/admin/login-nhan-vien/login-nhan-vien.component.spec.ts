import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNhanVienComponent } from './login-nhan-vien.component';

describe('LoginNhanVienComponent', () => {
  let component: LoginNhanVienComponent;
  let fixture: ComponentFixture<LoginNhanVienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginNhanVienComponent]
    });
    fixture = TestBed.createComponent(LoginNhanVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
