import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSubcategoryComponent } from './add-new-subcategory.component';

describe('AddNewSubcategoryComponent', () => {
  let component: AddNewSubcategoryComponent;
  let fixture: ComponentFixture<AddNewSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
