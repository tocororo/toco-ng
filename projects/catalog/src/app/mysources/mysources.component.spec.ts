import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysourcesComponent } from './mysources.component';

describe('MysourcesComponent', () => {
  let component: MysourcesComponent;
  let fixture: ComponentFixture<MysourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
