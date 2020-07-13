import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSimpleFaComponent } from './simple-container-fa.component';

describe('ContainerSimpleFaComponent', () => {
  let component: ContainerSimpleFaComponent;
  let fixture: ComponentFixture<ContainerSimpleFaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerSimpleFaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSimpleFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
