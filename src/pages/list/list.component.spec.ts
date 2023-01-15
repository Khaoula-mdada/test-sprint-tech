import { DatePipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers:[DatePipe,HttpClient,HttpHandler,{ provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
