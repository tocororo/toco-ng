import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputSelectComponent } from './test-select-input.component';

describe('TestInputSelectComponent', () => {
  let component: TestInputSelectComponent;
  let fixture: ComponentFixture<TestInputSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
