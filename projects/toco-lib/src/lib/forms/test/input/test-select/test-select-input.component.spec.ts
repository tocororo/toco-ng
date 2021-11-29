import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSelectInputComponent } from './test-select-input.component';

describe('TestSelectInputComponent', () => {
  let component: TestSelectInputComponent;
  let fixture: ComponentFixture<TestSelectInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSelectInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
