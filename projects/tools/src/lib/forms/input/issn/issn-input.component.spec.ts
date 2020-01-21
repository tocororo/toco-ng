import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIssnComponent } from './issn-input.component';

describe('InputIssnComponent', () => {
  let component: InputIssnComponent;
  let fixture: ComponentFixture<InputIssnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputIssnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIssnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
