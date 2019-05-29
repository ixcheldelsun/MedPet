import { TestBed } from '@angular/core/testing';

import { VacunasService } from './vacunas.service';

describe('VacunasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacunasService = TestBed.get(VacunasService);
    expect(service).toBeTruthy();
  });
});
