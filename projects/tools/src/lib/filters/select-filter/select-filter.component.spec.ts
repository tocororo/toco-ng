import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFilterOldComponent } from './select-filter.component';

describe('SelectFilterComponent', () => {
  let component: SelectFilterOldComponent;
  let fixture: ComponentFixture<SelectFilterOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFilterOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilterOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
