import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermGenericComponent } from './term-generic.component';

describe('TermGenericComponent', () => {
  let component: TermGenericComponent;
  let fixture: ComponentFixture<TermGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
