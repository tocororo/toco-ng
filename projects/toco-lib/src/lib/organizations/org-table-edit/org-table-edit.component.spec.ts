import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTableEditComponent } from './org-table-edit.component';

describe('OrgTableEditComponent', () => {
  let component: OrgTableEditComponent;
  let fixture: ComponentFixture<OrgTableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgTableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
