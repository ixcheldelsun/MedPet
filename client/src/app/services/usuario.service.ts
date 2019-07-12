/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario'

/**
 * Constante httpOptions
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
/**
 * Declaracion
 */
  private messageSource = new BehaviorSubject('default message');
/**
 * Declaracion
 */
  currentMessage = this.messageSource.asObservable();

/**
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Auth
 */
  auth(revisa: Usuario) {
    return this.http.post(`usuarios/auth`, revisa);
  }

  /**
 * Guardar usuario
 */
  saveUsuario(nuevo: Usuario) {
    return this.http.post(`usuarios/crear`, nuevo);
  }

  /**
 * Busca el correo del usuario
 */
  buscaUsuarioCorreo(correo: Usuario): Observable<Usuario> {
    return this.http.post(`usuarios/buscar`, correo);
  }

  /**
 * Obtiene las mascotas
 */
  getMascotas(id: number) {
    return this.http.get(`usuarios/${id}/mascotas`);
  }

  /**
 * PASS
 */
  olvidePass(olvido: Usuario){
    return this.http.post(`usuarios/olvide_pass`, olvido);
  }

   /**
 * PASS
 */
  reiniciaPass(reinicia: any){
    return this.http.post(`usuarios/reinicia_pass`, reinicia);
  }

   /**
 * PASS
 */
  enviaMensaje(form: any) {
    return this.http.post(`usuarios/envia_correo`, form)
  }
 /**
 * PASS
 */
  pasaMensaje(message: any) {
    this.messageSource.next(message)
  }


}
