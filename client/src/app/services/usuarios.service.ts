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


  auth(revisa: Usuario) {
    return this.http.post(`${this.API_URL}/auth`, revisa);
  }

  saveUsuario(nuevo: Usuario) {
    return this.http.post(`${this.API_URL}/crear`, nuevo);
  }

  getMascotas(id: number) {
    return this.http.get(`${this.API_URL}/${id}/mascotas`);
  }

  pasaMensaje(message: any) {
    this.messageSource.next(message)
  }


}
