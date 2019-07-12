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
 * Constructor
 */
  constructor(private http: HttpClient) { }

/**
 * Guardar celo
 */
  saveCelo(nueva: Celo) {
    return this.http.post(`celos/crear`, nueva);
  }

/**
 * Editar celo
 */
  editCelo(update: Celo) {
    return this.http.put(`celos/editar`, update, {responseType: "text"});
  }

/**
 * Borrar celo
 */
  deleteCelo(id: number) {
    return this.http.delete(`celos/eliminar/${id}`, {responseType: "text"});
  }


}