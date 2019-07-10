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

  constructor(private http: HttpClient) { }

  saveVacuna(nueva: Vacuna) {
    return this.http.post(`vacunas/crear`, nueva);
  }

editVacuna(update: Vacuna) {
    return this.http.put(`vacunas/editar`, update, {responseType: "text"});
  }

  deleteVacuna(id: number) {
    return this.http.delete(`vacunas/eliminar/${id}`, {responseType: "text"});
  }


}