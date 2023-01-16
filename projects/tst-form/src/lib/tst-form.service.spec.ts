import { DatePipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TstFormService } from './tst-form.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
describe('TstFormService', () => {
  let service: TstFormService;

  beforeEach(async() => {
    TestBed.configureTestingModule({  imports: [RouterTestingModule,HttpClientTestingModule],providers:[TstFormService,DatePipe,HttpClient,HttpHandler]}).compileComponents();;
    
    service = TestBed.inject(TstFormService);
  });

  it('should be created', async() => {
    expect(service).toBeTruthy();
  });
});
