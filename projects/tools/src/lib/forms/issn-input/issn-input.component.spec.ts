import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssnInputComponent } from './issn-input.component';

describe('IssnInputComponent', () => {
  let component: IssnInputComponent;
  let fixture: ComponentFixture<IssnInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssnInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
