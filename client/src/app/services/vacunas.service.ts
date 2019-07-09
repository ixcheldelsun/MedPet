import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Vacuna } from '../models/vacuna'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class VacunasService {

  API_URL = 'http://localhost:3000/vacunas';

  constructor(private http: HttpClient) { }

  saveVacuna(nueva: Vacuna) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

editVacuna(update: Vacuna) {
    return this.http.put(`${this.API_URL}/editar`, update, {responseType: "text"});
  }

  deleteVacuna(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`, {responseType: "text"});
  }


}