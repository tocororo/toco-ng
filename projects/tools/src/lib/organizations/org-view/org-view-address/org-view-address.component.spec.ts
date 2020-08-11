import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewAddressComponent } from './org-view-address.component';

describe('OrgViewAddressComponent', () => {
  let component: OrgViewAddressComponent;
  let fixture: ComponentFixture<OrgViewAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgViewAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgViewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
