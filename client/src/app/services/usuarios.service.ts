import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario'


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${this.API_URL}/usuarios`);
  }
  
  getUsuario(id: string) {
    return this.http.get(`${this.API_URL}/usuarios/${id}`);
  }

  saveUsuario(usuario: Usuario){
    return this.http.post(`${this.API_URL}/usuarios`, usuario);
  }

  updateUsuario(id: string, updatedUsuario: Usuario): Observable<Usuario>{
    return this.http.put(`${this.API_URL}/usuarios/${id}`, updatedUsuario);
  }
}
