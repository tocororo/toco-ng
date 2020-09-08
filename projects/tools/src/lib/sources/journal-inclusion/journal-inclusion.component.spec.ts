import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalInclusionComponent } from './journal-inclusion.component';

describe('JournalInclusionComponent', () => {
  let component: JournalInclusionComponent;
  let fixture: ComponentFixture<JournalInclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalInclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalInclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
