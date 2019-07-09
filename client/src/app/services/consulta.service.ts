import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Consulta } from '../models/consulta'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  API_URL = 'http://localhost:3000/consultas';

  constructor(private http: HttpClient) { }

  saveConsulta(nueva: Consulta) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

  editConsulta(update: Consulta) {
    return this.http.put(`${this.API_URL}/editar`, update, {responseType: "text"});
  }

  deleteConsulta(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`, {responseType: "text"});
  }
}
