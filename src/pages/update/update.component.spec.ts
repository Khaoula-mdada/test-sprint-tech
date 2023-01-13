import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComponent ],providers:[{ provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
