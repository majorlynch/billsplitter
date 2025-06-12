import { TestBed } from '@angular/core/testing';
import { DinersService } from '../services/diners.service';

describe('DinersService', () => {
  let service: DinersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
