import { TestBed } from '@angular/core/testing';

import { RedditmysubService } from './redditmysub.service';

describe('RedditmysubService', () => {
  let service: RedditmysubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedditmysubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
