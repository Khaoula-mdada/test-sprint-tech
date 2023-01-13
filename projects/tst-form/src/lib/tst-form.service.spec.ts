import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {async} from '@angular/core/testing';
import { TstFormService } from './tst-form.service';

describe('TstFormService', () => {
  let service: TstFormService;

  beforeEach(async() => {
    TestBed.configureTestingModule({providers:[TstFormService,DatePipe]});
    
    service = TestBed.inject(TstFormService);
  });

  it('should be created', async() => {
    expect(service).toBeTruthy();
  });
});
