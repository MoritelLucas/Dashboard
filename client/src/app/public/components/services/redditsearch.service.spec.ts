import { TestBed } from '@angular/core/testing';

import { RedditsearchService } from './redditsearch.service';

describe('RedditsearchService', () => {
  let service: RedditsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedditsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
