import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Desparasitacion } from '../models/desparasitacion'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DesparasitacionService {

  constructor(private http: HttpClient) { }

  saveDesparasitacion(nueva: Desparasitacion) {
    return this.http.post(`desparasitaciones/crear`, nueva);
  }

  editDesparasitacion(update: Desparasitacion) {
    return this.http.put(`desparasitaciones/editar`, update, {responseType: "text"});
  }

  deleteDesparasitacion(id: number) {
    return this.http.delete(`desparasitaciones/eliminar/${id}`, {responseType: "text"});
  }
}
