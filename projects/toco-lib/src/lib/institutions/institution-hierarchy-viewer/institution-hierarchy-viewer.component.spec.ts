import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionHierarchyViewerComponent } from './institution-hierarchy-viewer.component';

describe('InstitutionHierarchyViewerComponent', () => {
  let component: InstitutionHierarchyViewerComponent;
  let fixture: ComponentFixture<InstitutionHierarchyViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionHierarchyViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionHierarchyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
