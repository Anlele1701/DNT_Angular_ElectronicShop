import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuotFormComponent } from './chuot-form.component';

describe('ChuotFormComponent', () => {
  let component: ChuotFormComponent;
  let fixture: ComponentFixture<ChuotFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChuotFormComponent]
    });
    fixture = TestBed.createComponent(ChuotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
