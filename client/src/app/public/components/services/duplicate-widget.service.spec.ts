import { TestBed } from '@angular/core/testing';

import { DuplicateWidgetService } from './duplicate-widget.service';

describe('DuplicateWidgetService', () => {
  let service: DuplicateWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuplicateWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
