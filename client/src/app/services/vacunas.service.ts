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
 * Constructor
 */
  constructor(private http: HttpClient) { }

  /**
 * Guardar vacuna
 */
  saveVacuna(nueva: Vacuna) {
    return this.http.post(`vacunas/crear`, nueva);
  }

editVacuna(update: Vacuna) {
    return this.http.put(`vacunas/editar`, update, {responseType: "text"});
  }

  deleteVacuna(id: number) {
    return this.http.delete(`vacunas/eliminar/${id}`, {responseType: "text"});
  }


}