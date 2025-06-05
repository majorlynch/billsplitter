import { TestBed } from '@angular/core/testing';

import { PromptAiService } from './prompt-ai.service';

describe('PromptAiService', () => {
  let service: PromptAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
