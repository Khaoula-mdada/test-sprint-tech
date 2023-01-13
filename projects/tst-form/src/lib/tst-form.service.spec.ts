import { TestBed } from '@angular/core/testing';

import { TstFormService } from './tst-form.service';

describe('TstFormService', () => {
  let service: TstFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TstFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
