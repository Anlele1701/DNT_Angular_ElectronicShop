import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisComponent } from './login-regis.component';

describe('LoginRegisComponent', () => {
  let component: LoginRegisComponent;
  let fixture: ComponentFixture<LoginRegisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRegisComponent]
    });
    fixture = TestBed.createComponent(LoginRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
