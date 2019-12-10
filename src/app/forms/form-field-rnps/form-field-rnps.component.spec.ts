import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldRnpsComponent } from './form-field-rnps.component';

describe('FormFieldRnpsComponent', () => {
  let component: FormFieldRnpsComponent;
  let fixture: ComponentFixture<FormFieldRnpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldRnpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldRnpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
