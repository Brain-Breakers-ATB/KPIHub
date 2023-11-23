import { TestBed } from '@angular/core/testing';
import { StudentTelegramChannelsService } from './student-telegram-channels.service';

describe('StudentTelegramChannelsService', () => {
  let service: StudentTelegramChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentTelegramChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
