import { TestBed } from '@angular/core/testing';

import { ObservacionService } from './observacion.service';

describe('ObservacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservacionService = TestBed.get(ObservacionService);
    expect(service).toBeTruthy();
  });
});
