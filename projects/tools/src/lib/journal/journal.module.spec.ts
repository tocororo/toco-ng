/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

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
