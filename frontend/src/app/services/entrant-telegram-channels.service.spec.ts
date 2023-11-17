import { TestBed } from '@angular/core/testing';

import { EntrantTelegramChannelsService } from './entrant-telegram-channels.service';

describe('EntrantTelegramChannelsService', () => {
  let service: EntrantTelegramChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrantTelegramChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
