import { TestBed } from '@angular/core/testing';

import { InstitutesService } from './institutes.service';

describe('InstitutesService', () => {
  let service: InstitutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
