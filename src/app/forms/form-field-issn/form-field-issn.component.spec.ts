import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldIssnComponent } from './form-field-issn.component';

describe('FormFieldIssnComponent', () => {
  let component: FormFieldIssnComponent;
  let fixture: ComponentFixture<FormFieldIssnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldIssnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldIssnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
