import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputNumberComponent } from './test-number-input.component';

describe('TestInputNumberComponent', () => {
  let component: TestInputNumberComponent;
  let fixture: ComponentFixture<TestInputNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
