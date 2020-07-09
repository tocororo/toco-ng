import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFactory } from './component-factory.component';

describe('ComponentFactory', () => {
  let component: ComponentFactory;
  let fixture: ComponentFixture<ComponentFactory>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentFactory ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFactory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
