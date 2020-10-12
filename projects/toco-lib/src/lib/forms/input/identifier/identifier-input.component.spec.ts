import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIdentifierComponent } from './identifier-input.component';

describe('InputIdentifierComponent', () => {
  let component: InputIdentifierComponent;
  let fixture: ComponentFixture<InputIdentifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputIdentifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
