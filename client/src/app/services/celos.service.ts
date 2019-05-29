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

  API_URL = 'http://localhost:3000/celos';

  constructor(private http: HttpClient) { }

  saveCelo(nueva: Celo) {
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

  editCelo(update: Celo) {
    return this.http.put(`${this.API_URL}/editar`, update);
  }

  deleteCelo(id: number) {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`);
  }


}