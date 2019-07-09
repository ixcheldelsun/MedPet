import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observacion } from '../models/observacion'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {

  API_URL = 'http://localhost:3000/observaciones';

  constructor(private http: HttpClient) { }

  saveObservacion(nueva: Observacion) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

  editObservacion(update: Observacion) {
    return this.http.put(`${this.API_URL}/editar`, update,  {responseType: "text"});
  }

  deleteObservacion(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`, {responseType: "text"});
  }
}
