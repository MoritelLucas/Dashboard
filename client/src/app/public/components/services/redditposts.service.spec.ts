import { TestBed } from '@angular/core/testing';

import { RedditpostsService } from './redditposts.service';

describe('RedditpostsService', () => {
  let service: RedditpostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedditpostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
