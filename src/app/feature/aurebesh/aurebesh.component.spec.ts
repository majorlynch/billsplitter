import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AurebeshComponent } from './aurebesh.component';

describe('AurebeshComponent', () => {
  let component: AurebeshComponent;
  let fixture: ComponentFixture<AurebeshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AurebeshComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AurebeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
