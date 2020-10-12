import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewRelationshipComponent } from './org-view-relationship.component';

describe('OrgViewRelationshipComponent', () => {
  let component: OrgViewRelationshipComponent;
  let fixture: ComponentFixture<OrgViewRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgViewRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgViewRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
