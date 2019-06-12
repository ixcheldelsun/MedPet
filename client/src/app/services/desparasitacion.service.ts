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

  API_URL = 'http://localhost:3000/desparasitaciones';

  constructor(private http: HttpClient) { }

  saveDesparasitacion(nueva: Desparasitacion) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

  editDesparasitacion(update: Desparasitacion) {
    return this.http.put(`${this.API_URL}/editar`, update);
  }

  deleteDesparasitacion(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }
}
