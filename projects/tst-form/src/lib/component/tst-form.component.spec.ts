import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TstFormService } from '../tst-form.service';


import { TstFormComponent } from './tst-form.component';

describe('TstFormComponent', async() => {
  let component: TstFormComponent;
  let fixture: ComponentFixture<TstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TstFormComponent ],providers:[TstFormService,DatePipe]
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
