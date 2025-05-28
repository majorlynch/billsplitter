import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAiComponent } from './google-ai.component';

describe('GoogleAiComponent', () => {
  let component: GoogleAiComponent;
  let fixture: ComponentFixture<GoogleAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
