import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowapprovedcampComponent } from './showapprovedcamp.component';

describe('ShowapprovedcampComponent', () => {
  let component: ShowapprovedcampComponent;
  let fixture: ComponentFixture<ShowapprovedcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowapprovedcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowapprovedcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
