import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCreateCusComponent } from './pop-up-create-cus.component';

describe('PopUpCreateCusComponent', () => {
  let component: PopUpCreateCusComponent;
  let fixture: ComponentFixture<PopUpCreateCusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpCreateCusComponent]
    });
    fixture = TestBed.createComponent(PopUpCreateCusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
