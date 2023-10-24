import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DienThoaiFormComponent } from './dien-thoai-form.component';

describe('DienThoaiFormComponent', () => {
  let component: DienThoaiFormComponent;
  let fixture: ComponentFixture<DienThoaiFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DienThoaiFormComponent]
    });
    fixture = TestBed.createComponent(DienThoaiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
