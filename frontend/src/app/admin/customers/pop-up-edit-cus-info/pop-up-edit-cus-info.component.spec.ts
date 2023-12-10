import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEditCusInfoComponent } from './pop-up-edit-cus-info.component';

describe('PopUpEditCusInfoComponent', () => {
  let component: PopUpEditCusInfoComponent;
  let fixture: ComponentFixture<PopUpEditCusInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpEditCusInfoComponent]
    });
    fixture = TestBed.createComponent(PopUpEditCusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
