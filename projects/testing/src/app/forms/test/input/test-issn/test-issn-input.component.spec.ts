import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputIssnComponent } from './test-issn-input.component';

describe('TestInputIssnComponent', () => {
  let component: TestInputIssnComponent;
  let fixture: ComponentFixture<TestInputIssnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputIssnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputIssnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
