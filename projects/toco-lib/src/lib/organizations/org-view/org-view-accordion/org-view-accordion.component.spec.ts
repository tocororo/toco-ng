import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewAccordionComponent } from './org-view-accordion.component';

describe('OrgViewAccordionComponent', () => {
  let component: OrgViewAccordionComponent;
  let fixture: ComponentFixture<OrgViewAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgViewAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgViewAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
