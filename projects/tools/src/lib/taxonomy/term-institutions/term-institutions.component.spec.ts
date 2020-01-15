import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermInstitutionsComponent } from './term-institutions.component';

describe('TermInstitutionsComponent', () => {
  let component: TermInstitutionsComponent;
  let fixture: ComponentFixture<TermInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
