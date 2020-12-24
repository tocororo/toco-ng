import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapSceibaComponent } from './road-map-sceiba.component';

describe('RoadMapSceibaComponent', () => {
  let component: RoadMapSceibaComponent;
  let fixture: ComponentFixture<RoadMapSceibaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadMapSceibaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadMapSceibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
