import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldTermParentComponent } from './form-field-term-parent.component';

describe('FormFieldTermParentComponent', () => {
  let component: FormFieldTermParentComponent;
  let fixture: ComponentFixture<FormFieldTermParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldTermParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldTermParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
