import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewGeoNamesCityComponent } from './org-view-geo-names-city.component';

describe('OrgViewGeoNamesCityComponent', () => {
  let component: OrgViewGeoNamesCityComponent;
  let fixture: ComponentFixture<OrgViewGeoNamesCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgViewGeoNamesCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgViewGeoNamesCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
