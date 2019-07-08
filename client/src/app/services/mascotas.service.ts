/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota'
import { Vacuna } from '../models/vacuna'
import { Desparasitacion } from '../models/desparasitacion';

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
export class MascotasService {
/**
 * Declaracion 
 */
  mascotaActual: Mascota;
/**
 * URL
 */
  API_URL = 'http://localhost:3000/mascotas';

  /**
 * Constructor
 */
  constructor(private http: HttpClient) {}

  /**
 * Guardar mascota
 */
  saveMascota(nueva: Mascota) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

   /**
 * Función para hacer set/actualizar mascota actual
 */
  setMascotaActual(mascota: Mascota) {
    this.mascotaActual = mascota;
  }

    /**
 * Obtener vacunas
 */
  getVacunas(id: number) {
    return this.http.get(`${this.API_URL}/${id}/vacunas`);
  }

  /**
 * Obtener celos
 */
  getCelos(id: number) {
    return this.http.get(`${this.API_URL}/${id}/celos`);
  }

  /**
 * Obtener desparasitaciones
 */
  getDesparasitaciones(id: number) {
    return this.http.get(`${this.API_URL}/${id}/desparasitaciones`);
  }

/**
 * Obtener consultas
 */
  getConsultas(id: number) {
    return this.http.get(`${this.API_URL}/${id}/consultas`);
  }

/**
 * Obtener observaciones
 */
  getObservaciones(id: number) {
    return this.http.get(`${this.API_URL}/${id}/observaciones`);
  }

}