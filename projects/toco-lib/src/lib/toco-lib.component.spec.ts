import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TocoLibComponent } from './toco-lib.component';

describe('TocoLibComponent', () => {
  let component: TocoLibComponent;
  let fixture: ComponentFixture<TocoLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TocoLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TocoLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
