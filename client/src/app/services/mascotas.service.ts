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
 * Constructor
 */
  constructor(private http: HttpClient) {}

  /**
 * Guardar mascota
 */
  saveMascota(nueva: Mascota) {
    return this.http.post(`mascotas/crear`, nueva);
  }

  editMascota(update: Mascota) {
    console.log("llego al editMascota")
    return this.http.put(`mascotas/editar`, update,  {responseType: "text"});
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
    return this.http.get(`mascotas/${id}/vacunas`);
  }

  /**
 * Obtener celos
 */
  getCelos(id: number) {
    return this.http.get(`mascotas/${id}/celos`);
  }

  /**
 * Obtener desparasitaciones
 */
  getDesparasitaciones(id: number) {
    return this.http.get(`mascotas/${id}/desparasitaciones`);
  }

/**
 * Obtener consultas
 */
  getConsultas(id: number) {
    return this.http.get(`mascotas/${id}/consultas`);
  }

/**
 * Obtener observaciones
 */
  getObservaciones(id: number) {
    return this.http.get(`mascotas/${id}/observaciones`);
  }

}