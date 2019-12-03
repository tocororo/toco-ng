import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssnFormFieldComponent } from './issn-form-field.component';

describe('IssnFormFieldComponent', () => {
  let component: IssnFormFieldComponent;
  let fixture: ComponentFixture<IssnFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssnFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssnFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
