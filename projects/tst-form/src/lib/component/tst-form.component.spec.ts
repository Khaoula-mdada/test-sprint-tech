import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TstFormService } from '../tst-form.service';
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { HttpClientTestingModule } from "@angular/common/http/testing";

import { TstFormComponent } from './tst-form.component';

describe('TstFormComponent', async() => {
  let component: TstFormComponent;
  let fixture: ComponentFixture<TstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TstFormComponent,HttpClientTestingModule,RouterTestingModule,BrowserAnimationsModule ],providers:[TstFormService,DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',async () => {
    expect(component).toBeTruthy();
  });
});
