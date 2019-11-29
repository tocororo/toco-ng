import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdsPanelFormFieldComponent } from './ids-panel-form-field.component';

describe('IdsPanelFormFieldComponent', () => {
  let component: IdsPanelFormFieldComponent;
  let fixture: ComponentFixture<IdsPanelFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdsPanelFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdsPanelFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
