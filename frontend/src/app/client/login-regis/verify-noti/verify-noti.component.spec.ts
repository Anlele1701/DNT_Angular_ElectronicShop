import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyNotiComponent } from './verify-noti.component';

describe('VerifyNotiComponent', () => {
  let component: VerifyNotiComponent;
  let fixture: ComponentFixture<VerifyNotiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyNotiComponent]
    });
    fixture = TestBed.createComponent(VerifyNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
