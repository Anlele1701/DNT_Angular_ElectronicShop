import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManHinhFormComponent } from './man-hinh-form.component';

describe('ManHinhFormComponent', () => {
  let component: ManHinhFormComponent;
  let fixture: ComponentFixture<ManHinhFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManHinhFormComponent]
    });
    fixture = TestBed.createComponent(ManHinhFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
