import { TestBed } from '@angular/core/testing';

import { RiotmatchserviceService } from './riotmatchservice.service';

describe('RiotmatchserviceService', () => {
  let service: RiotmatchserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiotmatchserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
