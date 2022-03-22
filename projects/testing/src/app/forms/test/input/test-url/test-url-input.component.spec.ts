import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputUrlComponent } from './test-url-input.component';

describe('TestInputUrlComponent', () => {
  let component: TestInputUrlComponent;
  let fixture: ComponentFixture<TestInputUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
