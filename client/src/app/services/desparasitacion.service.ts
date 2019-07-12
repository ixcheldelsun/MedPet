/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Desparasitacion } from '../models/desparasitacion'

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
export class DesparasitacionService {
  
    /**
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Guardar desparasitacion
 */
  saveDesparasitacion(nueva: Desparasitacion) {
    return this.http.post(`desparasitaciones/crear`, nueva);
  }
/**
 * Editar desparasitacion
 */
  editDesparasitacion(update: Desparasitacion) {
    return this.http.put(`desparasitaciones/editar`, update, {responseType: "text"});
  }
/**
 * Borrar desparasitacion
 */
  deleteDesparasitacion(id: number) {
    return this.http.delete(`desparasitaciones/eliminar/${id}`, {responseType: "text"});
  }
}
