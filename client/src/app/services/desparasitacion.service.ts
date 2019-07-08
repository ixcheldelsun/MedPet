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
 * URL
 */
  API_URL = 'http://localhost:3000/desparasitaciones';

  /**
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Guardar desparasitacion
 */
  saveDesparasitacion(nueva: Desparasitacion) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }
/**
 * Editar desparasitacion
 */
  editDesparasitacion(update: Desparasitacion) {
    return this.http.put(`${this.API_URL}/editar`, update);
  }
/**
 * Borrar desparasitacion
 */
  deleteDesparasitacion(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }
}
