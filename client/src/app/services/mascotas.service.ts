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

  constructor(private http: HttpClient) {}

  saveMascota(nueva: Mascota) {
    return this.http.post(`mascotas/crear`, nueva);
  }

  editMascota(update: Mascota) {
    console.log("llego al editMascota")
    return this.http.put(`mascotas/editar`, update,  {responseType: "text"});
  }

  //Función para hacer set/actualizar mascota actual
  setMascotaActual(mascota: Mascota) {
    this.mascotaActual = mascota;
  }

  getVacunas(id: number) {
    return this.http.get(`mascotas/${id}/vacunas`);
  }

  getCelos(id: number) {
    return this.http.get(`mascotas/${id}/celos`);
  }

  getDesparasitaciones(id: number) {
    return this.http.get(`mascotas/${id}/desparasitaciones`);
  }

  getConsultas(id: number) {
    return this.http.get(`mascotas/${id}/consultas`);
  }

  getObservaciones(id: number) {
    return this.http.get(`mascotas/${id}/observaciones`);
  }

}