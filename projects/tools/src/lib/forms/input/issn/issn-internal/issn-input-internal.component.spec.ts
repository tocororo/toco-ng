import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIssnInternalComponent } from './issn-input-internal.component';

describe('InputIssnInternalComponent', () => {
  let component: InputIssnInternalComponent;
  let fixture: ComponentFixture<InputIssnInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputIssnInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIssnInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
