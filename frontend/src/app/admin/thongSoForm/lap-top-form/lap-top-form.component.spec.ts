import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapTopFormComponent } from './lap-top-form.component';

describe('LapTopFormComponent', () => {
  let component: LapTopFormComponent;
  let fixture: ComponentFixture<LapTopFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LapTopFormComponent]
    });
    fixture = TestBed.createComponent(LapTopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
