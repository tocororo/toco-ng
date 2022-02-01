import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestContainerControlComponent } from './test-container-control.component';

describe('TestContainerControlComponent', () => {
  let component: TestContainerControlComponent;
  let fixture: ComponentFixture<TestContainerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestContainerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
