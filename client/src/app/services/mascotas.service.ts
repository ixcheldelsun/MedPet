import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mascota } from '../models/mascota'
import { Vacuna } from '../models/vacuna'
import { Desparasitacion } from '../models/desparasitacion';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  mascotaActual: Mascota;

  API_URL = 'http://localhost:3000/mascotas';

  constructor(private http: HttpClient) {}

  saveMascota(nueva: Mascota) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

  //Función para hacer set/actualizar mascota actual
  setMascotaActual(mascota: Mascota) {
    this.mascotaActual = mascota;
  }

  getVacunas(id: number) {
    return this.http.get(`${this.API_URL}/${id}/vacunas`);
  }

  getCelos(id: number) {
    return this.http.get(`${this.API_URL}/${id}/celos`);
  }

  getDesparasitaciones(id: number) {
    return this.http.get(`${this.API_URL}/${id}/desparasitaciones`);
  }

  getConsultas(id: number) {
    return this.http.get(`${this.API_URL}/${id}/consultas`);
  }

  getObservaciones(id: number) {
    return this.http.get(`${this.API_URL}/${id}/observaciones`);
  }

}