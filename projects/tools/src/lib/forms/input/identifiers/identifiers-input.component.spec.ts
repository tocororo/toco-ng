import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIdentifiersComponent } from './identifiers-input.component';

describe('InputIdentifiersComponent', () => {
  let component: InputIdentifiersComponent;
  let fixture: ComponentFixture<InputIdentifiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputIdentifiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIdentifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
