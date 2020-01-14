import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldVocabularyComponent } from './form-field-vocabulary.component';

describe('FormFieldVocabularyComponent', () => {
  let component: FormFieldVocabularyComponent;
  let fixture: ComponentFixture<FormFieldVocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldVocabularyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
