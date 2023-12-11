import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareProductComponent } from './compare-product.component';

describe('CompareProductComponent', () => {
  let component: CompareProductComponent;
  let fixture: ComponentFixture<CompareProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareProductComponent]
    });
    fixture = TestBed.createComponent(CompareProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
