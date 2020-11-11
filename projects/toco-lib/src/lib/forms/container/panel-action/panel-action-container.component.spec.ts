import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPanelActionComponent } from './panel-action-container.component'

describe('ContainerPanelActionComponent', () => {
  let component: ContainerPanelActionComponent;
  let fixture: ComponentFixture<ContainerPanelActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerPanelActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPanelActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
