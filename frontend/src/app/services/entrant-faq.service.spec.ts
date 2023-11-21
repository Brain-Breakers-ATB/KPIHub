import { TestBed } from '@angular/core/testing';
import { EntrantFAQService } from './entrant-faq.service';

describe('EntrantFAQService', () => {
  let service: EntrantFAQService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrantFAQService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
