import { TestBed } from '@angular/core/testing';

import { TocoLibService } from './toco-lib.service';

describe('TocoLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TocoLibService = TestBed.get(TocoLibService);
    expect(service).toBeTruthy();
  });
});
