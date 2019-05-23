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

  saveMascota(nombre: String, apodo: String, especie: String, raza: String, sexo: String, fecha_nacimiento: String, id_usuario: Number){
    let mascota = {nombre:`${nombre}`, apodo:`${apodo}`, especie:`${especie}`, raza:`${raza}`, sexo:`${sexo}`, fecha_nacimiento: `${fecha_nacimiento}`, id_usuario: `${id_usuario}`};
    console.log(mascota);
    return this.http.post(`${this.API_URL}/crear`, mascota);
  }

}