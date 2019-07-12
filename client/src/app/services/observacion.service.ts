/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observacion } from '../models/observacion'

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
export class ObservacionService {
/**
 * URL
 */
  API_URL = 'http://localhost:3000/observaciones';
/**
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Guardar observacion
 */
  saveObservacion(nueva: Observacion) {
    return this.http.post(`observaciones/crear`, nueva);
  }

/**
 * Editar observacion
 */
  editObservacion(update: Observacion) {
    return this.http.put(`observaciones/editar`, update,  {responseType: "text"});
  }

/**
 * Borrar observacion
 */
  deleteObservacion(id: number) {
    return this.http.delete(`observaciones/eliminar/${id}`, {responseType: "text"});
  }
}
