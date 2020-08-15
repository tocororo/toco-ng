import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFactory_Depr } from './component-factory-depr.component';

describe('ComponentFactory_Depr', () => {
  let component: ComponentFactory_Depr;
  let fixture: ComponentFixture<ComponentFactory_Depr>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentFactory_Depr ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentFactory_Depr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
