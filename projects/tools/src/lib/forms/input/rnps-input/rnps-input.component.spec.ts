import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnpsInputComponent } from './rnps-input.component';

describe('RnpsInputComponent', () => {
  let component: RnpsInputComponent;
  let fixture: ComponentFixture<RnpsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnpsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnpsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
