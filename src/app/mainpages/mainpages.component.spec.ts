import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpagesComponent } from './mainpages.component';

describe('MainpagesComponent', () => {
  let component: MainpagesComponent;
  let fixture: ComponentFixture<MainpagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
