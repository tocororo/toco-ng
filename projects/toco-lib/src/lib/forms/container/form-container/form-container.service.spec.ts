import { TestBed } from '@angular/core/testing';

import { FormContainerService } from './form-container.service';

describe('FormContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormContainerService = TestBed.inject(FormContainerService);
    expect(service).toBeTruthy();
  });
});
