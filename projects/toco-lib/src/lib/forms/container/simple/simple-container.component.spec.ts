import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSimpleComponent } from './simple-container.component';

describe('ContainerSimpleComponent', () => {
  let component: ContainerSimpleComponent;
  let fixture: ComponentFixture<ContainerSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
