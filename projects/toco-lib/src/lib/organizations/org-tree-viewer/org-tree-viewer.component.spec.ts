import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTreeViewerComponent } from './org-tree-viewer.component';

describe('OrgTreeViewerComponent', () => {
  let component: OrgTreeViewerComponent;
  let fixture: ComponentFixture<OrgTreeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgTreeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTreeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
