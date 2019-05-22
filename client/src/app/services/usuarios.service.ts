import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URL = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${this.API_URL}`);
  }
  
  getUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URL}/buscar`, usuario, );
  }

  auth(correo: String, pass: String){
    console.log('hola')
    let usuario = {correo:`${correo}`, contraseña:`${pass}`}
    return this.http.post(`${this.API_URL}/auth`, usuario);
  }

}
