import { TestBed } from '@angular/core/testing';

import { NasaserviceService } from './nasaservice.service';

describe('NasaserviceService', () => {
  let service: NasaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
