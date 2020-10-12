import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraInstitutionSelectorComponent } from './extra-institution-selector.component';

describe('ExtraInstitutionSelectorComponent', () => {
  let component: ExtraInstitutionSelectorComponent;
  let fixture: ComponentFixture<ExtraInstitutionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraInstitutionSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraInstitutionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
