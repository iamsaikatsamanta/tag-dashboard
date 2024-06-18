import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercampaignComponent } from './usercampaign.component';

describe('UsercampaignComponent', () => {
  let component: UsercampaignComponent;
  let fixture: ComponentFixture<UsercampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
