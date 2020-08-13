import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewGeoNamesAdminComponent } from './org-view-geo-names-admin.component';

describe('OrgViewGeoNamesAdminComponent', () => {
  let component: OrgViewGeoNamesAdminComponent;
  let fixture: ComponentFixture<OrgViewGeoNamesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgViewGeoNamesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgViewGeoNamesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
