import { TestBed, async } from '@angular/core/testing';
import { JournalEditComponent } from './journal-edit.component';

describe('JournalEditComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JournalEditComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(JournalEditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'inclusion'`, () => {
    const fixture = TestBed.createComponent(JournalEditComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('inclusion');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(JournalEditComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('inclusion app is running!');
  });
});
