import { TestBed } from '@angular/core/testing';

import { CelosService } from './celos.service';

describe('CelosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CelosService = TestBed.get(CelosService);
    expect(service).toBeTruthy();
  });
});
