import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiNgheFormComponent } from './tai-nghe-form.component';

describe('TaiNgheFormComponent', () => {
  let component: TaiNgheFormComponent;
  let fixture: ComponentFixture<TaiNgheFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaiNgheFormComponent]
    });
    fixture = TestBed.createComponent(TaiNgheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
