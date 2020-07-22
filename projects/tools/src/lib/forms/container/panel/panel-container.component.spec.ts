import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPanelComponent } from './panel-container.component';

describe('ContainerPanelComponent', () => {
  let component: ContainerPanelComponent;
  let fixture: ComponentFixture<ContainerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
