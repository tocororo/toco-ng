import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalInstitutionsComponent } from './journal-institutions.component';

describe('JournalInstitutionsComponent', () => {
  let component: JournalInstitutionsComponent;
  let fixture: ComponentFixture<JournalInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
