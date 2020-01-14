import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutocompleteFilterComponent } from './select-autocomplete-filter.component';

describe('SelectAutocompleteFilterComponent', () => {
  let component: SelectAutocompleteFilterComponent;
  let fixture: ComponentFixture<SelectAutocompleteFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAutocompleteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAutocompleteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
