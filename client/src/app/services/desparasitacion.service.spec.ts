import { TestBed } from '@angular/core/testing';

import { DesparasitacionService } from './desparasitacion.service';

describe('DesparasitacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesparasitacionService = TestBed.get(DesparasitacionService);
    expect(service).toBeTruthy();
  });
});
