import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutoptionComponent } from './payoutoption.component';

describe('PayoutoptionComponent', () => {
  let component: PayoutoptionComponent;
  let fixture: ComponentFixture<PayoutoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
