import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewRelationshipsComponent } from './org-view-relationships.component';

describe('OrgViewRelationshipsComponent', () => {
  let component: OrgViewRelationshipsComponent;
  let fixture: ComponentFixture<OrgViewRelationshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgViewRelationshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgViewRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
