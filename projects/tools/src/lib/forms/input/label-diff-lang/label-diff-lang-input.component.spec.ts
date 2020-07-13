import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLabelDiffLangComponent } from './label-diff-lang-input.component';

describe('InputLabelDiffLangComponent', () => {
  let component: InputLabelDiffLangComponent;
  let fixture: ComponentFixture<InputLabelDiffLangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputLabelDiffLangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputLabelDiffLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
