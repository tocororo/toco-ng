import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputBoolComponent } from './test-bool-input.component';

describe('TestInputBoolComponent', () => {
  let component: TestInputBoolComponent;
  let fixture: ComponentFixture<TestInputBoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputBoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputBoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
