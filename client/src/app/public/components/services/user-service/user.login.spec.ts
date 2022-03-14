import { TestBed } from '@angular/core/testing';

import { Userlogin } from './user.login';

describe('Userlogin', () => {
  let service: Userlogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userlogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
