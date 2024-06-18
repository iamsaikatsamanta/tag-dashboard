import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedcampDetelsComponent } from './appliedcamp-detels.component';

describe('AppliedcampDetelsComponent', () => {
  let component: AppliedcampDetelsComponent;
  let fixture: ComponentFixture<AppliedcampDetelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedcampDetelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedcampDetelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
