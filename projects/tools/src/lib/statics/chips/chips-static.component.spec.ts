import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticChipsComponent } from './chips-static.component';

describe('StaticChipsComponent', () => {
  let component: StaticChipsComponent;
  let fixture: ComponentFixture<StaticChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
