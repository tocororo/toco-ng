import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionSelectorComponent } from './institution-selector.component';

describe('InstitutionSelectorComponent', () => {
  let component: InstitutionSelectorComponent;
  let fixture: ComponentFixture<InstitutionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
