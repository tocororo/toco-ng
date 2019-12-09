import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssnFormFieldInternalComponent } from './issn-form-field-internal.component';

describe('IssnFormFieldInternalComponent', () => {
  let component: IssnFormFieldInternalComponent;
  let fixture: ComponentFixture<IssnFormFieldInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssnFormFieldInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssnFormFieldInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
