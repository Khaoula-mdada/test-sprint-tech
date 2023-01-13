import { TestBed } from '@angular/core/testing';

import { AppDataServicesService } from './app-data-services.service';

describe('AppDataServicesService', () => {
  let service: AppDataServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDataServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
