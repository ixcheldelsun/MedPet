/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Celo } from '../models/celo'

/**
 * Constante httpOptions
 */
const httpOptions = {
  /**
 * Constante 
 */
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class CelosService {
/**
 * URL
 */
  API_URL = 'http://localhost:3000/celos';

  /**
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Guardar celo
 */
  saveCelo(nueva: Celo) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

/**
 * Editar celo
 */
  editCelo(update: Celo) {
    return this.http.put(`${this.API_URL}/editar`, update);
  }

/**
 * Borrar celo
 */
  deleteCelo(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }


}