import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Mascota } from '../models/mascota'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  API_URL = 'http://localhost:3000/mascotas';

  constructor(private http: HttpClient) { }

  getMascotas() {
    return this.http.get(`${this.API_URL}`);
  }

  saveMascota(nueva: Mascota){
    return this.http.post(`${this.API_URL}/crear`, nueva);
  }

}