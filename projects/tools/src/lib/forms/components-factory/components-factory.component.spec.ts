import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsFactory } from './components-factory.component';

describe('ComponentsFactory', () => {
  let component: ComponentsFactory;
  let fixture: ComponentFixture<ComponentsFactory>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsFactory ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsFactory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
