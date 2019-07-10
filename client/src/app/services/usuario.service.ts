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


  constructor(private http: HttpClient) { }


  auth(revisa: Usuario) {
    return this.http.post(`usuarios/auth`, revisa);
  }

  saveUsuario(nuevo: Usuario) {
    return this.http.post(`usuarios/crear`, nuevo);
  }

  buscaUsuarioCorreo(correo: Usuario): Observable<Usuario> {
    return this.http.post(`usuarios/buscar`, correo);
  }

  getMascotas(id: number) {
    return this.http.get(`usuarios/${id}/mascotas`);
  }

  olvidePass(olvido: Usuario){
    return this.http.post(`usuarios/olvide_pass`, olvido);
  }

  reiniciaPass(reinicia: any){
    return this.http.post(`usuarios/reinicia_pass`, reinicia);
  }

  enviaMensaje(form: any) {
    return this.http.post(`usuarios/envia_correo`, form)
  }

  pasaMensaje(message: any) {
    this.messageSource.next(message)
  }


}
