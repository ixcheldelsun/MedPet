/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vacuna } from '../models/vacuna'

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

/**
 * Clase 
 */
export class VacunasService {
/**
 * URL
 */
  API_URL = 'http://localhost:3000/vacunas';
/**
 * Constructor
 */
  constructor(private http: HttpClient) { }

  /**
 * Guardar vacuna
 */
  saveVacuna(nueva: Vacuna) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

}