import { TestBed } from '@angular/core/testing';

import { UsuariosService } from './usuario.service';

describe('UsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosService = TestBed.get(UsuariosService);
    expect(service).toBeTruthy();
  });
});
