import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputTextComponent } from './test-text-input.component';

describe('TestInputTextComponent', () => {
  let component: TestInputTextComponent;
  let fixture: ComponentFixture<TestInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
