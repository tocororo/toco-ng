import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssnInputInternalComponent } from './issn-input-internal.component';

describe('IssnInputInternalComponent', () => {
  let component: IssnInputInternalComponent;
  let fixture: ComponentFixture<IssnInputInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssnInputInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssnInputInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
