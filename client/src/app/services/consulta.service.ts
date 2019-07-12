/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Consulta } from '../models/consulta'

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
export class ConsultaService {

  /**
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Guardar consulta
 */
  saveConsulta(nueva: Consulta) {
    return this.http.post(`consultas/crear`, nueva);
  }

/**
 * Editar consulta
 */
  editConsulta(update: Consulta) {
    return this.http.put(`consultas/editar`, update, {responseType: "text"});
  }

/**
 * Borrar consulta
 */
  deleteConsulta(id: number) {
    return this.http.delete(`consultas/eliminar/${id}`, {responseType: "text"});
  }
}
