import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Usuario } from '../models/usuario'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  API_URL = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${this.API_URL}`);
  }
  
  getUsuario(correo: String) {
    let usuario = {correo:`${correo}`}
    return this.http.post(`${this.API_URL}/buscar`, usuario);
  }

  auth(correo: String, pass: String){
    let usuario = {correo:`${correo}`, contraseña:`${pass}`}
    return this.http.post(`${this.API_URL}/auth`, usuario);
  }

  saveUsuario(nombre: String, apellido: String, correo: String, pass: String){
    let usuario = {nombre:`${nombre}`, apellido:`${apellido}`, correo:`${correo}`, contraseña:`${pass}`}
    return this.http.post(`${this.API_URL}/crear`, usuario);
  }

  pasaMensaje(message: any) {
    this.messageSource.next(message)
  }


}
