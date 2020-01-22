import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalHomeComponent } from './journal-home.component';

describe('JournalHomeComponent', () => {
  let component: JournalHomeComponent;
  let fixture: ComponentFixture<JournalHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
