import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermParentComponent } from './term-parent.component';

describe('TermParentComponent', () => {
  let component: TermParentComponent;
  let fixture: ComponentFixture<TermParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
