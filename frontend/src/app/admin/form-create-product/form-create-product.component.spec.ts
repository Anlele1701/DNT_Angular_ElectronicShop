import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateProductComponent } from './form-create-product.component';

describe('FormCreateProductComponent', () => {
  let component: FormCreateProductComponent;
  let fixture: ComponentFixture<FormCreateProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateProductComponent]
    });
    fixture = TestBed.createComponent(FormCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
