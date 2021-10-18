import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrgsComponent } from './select-orgs.component';

describe('SelectOrgsComponent', () => {
  let component: SelectOrgsComponent;
  let fixture: ComponentFixture<SelectOrgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOrgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
