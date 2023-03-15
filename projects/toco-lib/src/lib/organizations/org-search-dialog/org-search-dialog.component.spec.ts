import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSearchDialogComponent } from './org-search-dialog.component';

describe('OrgSearchDialogComponent', () => {
  let component: OrgSearchDialogComponent;
  let fixture: ComponentFixture<OrgSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
