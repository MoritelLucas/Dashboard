import { TestBed } from '@angular/core/testing';

import { RiotserviceService } from './riotservice.service';

describe('RiotserviceService', () => {
  let service: RiotserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiotserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
