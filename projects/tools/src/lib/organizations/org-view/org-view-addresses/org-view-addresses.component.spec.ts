import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewAddressesComponent } from './org-view-addresses.component';

describe('OrgViewAddressesComponent', () => {
  let component: OrgViewAddressesComponent;
  let fixture: ComponentFixture<OrgViewAddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgViewAddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgViewAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
