import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionHierarchySelectorComponent } from './institution-hierarchy-selector.component';

describe('InstitutionSelectorComponent', () => {
  let component: InstitutionHierarchySelectorComponent;
  let fixture: ComponentFixture<InstitutionHierarchySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionHierarchySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionHierarchySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
