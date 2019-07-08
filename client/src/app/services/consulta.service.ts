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
 * URL
 */
  API_URL = 'http://localhost:3000/consultas';

  /**
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Guardar consulta
 */
  saveConsulta(nueva: Consulta) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

/**
 * Editar consulta
 */
  editConsulta(update: Consulta) {
    return this.http.put(`${this.API_URL}/editar`, update);
  }

/**
 * Borrar consulta
 */
  deleteConsulta(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }
}
