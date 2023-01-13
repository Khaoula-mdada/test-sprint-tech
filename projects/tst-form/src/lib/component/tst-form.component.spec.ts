import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TstFormComponent } from './tst-form.component';

describe('TstFormComponent', () => {
  let component: TstFormComponent;
  let fixture: ComponentFixture<TstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TstFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
