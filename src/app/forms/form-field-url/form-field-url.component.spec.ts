import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldUrlComponent } from './form-field-url.component';

describe('FormFieldUrlComponent', () => {
  let component: FormFieldUrlComponent;
  let fixture: ComponentFixture<FormFieldUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
