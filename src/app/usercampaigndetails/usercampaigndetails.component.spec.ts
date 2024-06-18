import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercampaigndetailsComponent } from './usercampaigndetails.component';

describe('UsercampaigndetailsComponent', () => {
  let component: UsercampaigndetailsComponent;
  let fixture: ComponentFixture<UsercampaigndetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercampaigndetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercampaigndetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
