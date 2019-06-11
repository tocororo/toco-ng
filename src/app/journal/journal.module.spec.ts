import { JournalModule } from './journal.module';

describe('JournalModule', () => {
  let journalModule: JournalModule;

  beforeEach(() => {
    journalModule = new JournalModule();
  });

  it('should create an instance', () => {
    expect(journalModule).toBeTruthy();
  });
});
