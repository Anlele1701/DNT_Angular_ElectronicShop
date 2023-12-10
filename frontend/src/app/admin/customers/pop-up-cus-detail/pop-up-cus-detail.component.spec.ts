import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCusDetailComponent } from './pop-up-cus-detail.component';

describe('PopUpCusDetailComponent', () => {
  let component: PopUpCusDetailComponent;
  let fixture: ComponentFixture<PopUpCusDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpCusDetailComponent]
    });
    fixture = TestBed.createComponent(PopUpCusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
