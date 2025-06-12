import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormDinerComponent } from './dynamic-form-diner.component';

describe('DynamicFormQuestionComponent', () => {
  let component: DynamicFormDinerComponent;
  let fixture: ComponentFixture<DynamicFormDinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormDinerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormDinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
