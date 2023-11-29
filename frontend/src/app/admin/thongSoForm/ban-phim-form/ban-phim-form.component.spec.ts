import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanPhimFormComponent } from './ban-phim-form.component';

describe('BanPhimFormComponent', () => {
  let component: BanPhimFormComponent;
  let fixture: ComponentFixture<BanPhimFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanPhimFormComponent]
    });
    fixture = TestBed.createComponent(BanPhimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
