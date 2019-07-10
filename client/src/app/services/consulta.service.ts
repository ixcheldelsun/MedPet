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


  constructor(private http: HttpClient) { }

  saveConsulta(nueva: Consulta) {
    return this.http.post(`consultas/crear`, nueva);
  }

  editConsulta(update: Consulta) {
    return this.http.put(`consultas/editar`, update, {responseType: "text"});
  }

  deleteConsulta(id: number) {
    return this.http.delete(`consultas/eliminar/${id}`, {responseType: "text"});
  }
}
