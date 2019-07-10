import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Celo } from '../models/celo'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CelosService {


  constructor(private http: HttpClient) { }

  saveCelo(nueva: Celo) {
    return this.http.post(`celos/crear`, nueva);
  }

  editCelo(update: Celo) {
    return this.http.put(`celos/editar`, update, {responseType: "text"});
  }

  deleteCelo(id: number) {
    return this.http.delete(`celos/eliminar/${id}`, {responseType: "text"});
  }


}