import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MascotasService } from '../../services/mascotas.service';

import { Desparasitacion } from '../../models/desparasitacion';
import { Celo } from '../../models/celo';
import { Consulta } from '../../models/consulta';
import { Mascota } from 'src/app/models/mascota';



/**
 * Componente
 */
@Component({
  selector: 'app-proximas',
  templateUrl: './proximas.component.html',
  styleUrls: ['./proximas.component.css']
})
export class ProximasComponent implements OnInit {
/**
 * Declaracion de la variable mascotaActual
 */
  mascotaActual: Mascota;
/**
 * Declaracion de la variable desparasitacionesProximas
 */
  desparasitacionesProximas = [];
  /**
 * Declaracion de la variable celosProximas
 */
  celosProximas = [];
  /**
 * Declaracion de la variable consultasProximas
 */
  consultasProximas = [];
  /**
 * Declaracion de la variable vacunasProximas
 */
  vacunasProximas = [];
/**
 * Declaracion de la variable contProximas
 */
  contProximas: number;
/**
 * Declaracion de la variable hoy
 */
  hoy = new Date(Date.now())


/**
 * Constructor
 */
  constructor(private mascotaService: MascotasService, private router: Router) {
   }
/**
 * ngOnInit
 */
  ngOnInit() {
    this.contProximas = 0;
    
    this.mascotaActual = this.mascotaService.mascotaActual;

    if (!this.mascotaActual) {
      this.router.navigate(['/escoger-mascota'])
    }

    this.mascotaService.getDesparasitaciones(this.mascotaActual.id_mascota).subscribe(
      desparasitaciones => {
        const size = Object.keys(desparasitaciones);
        for (let i = 0; i < size.length ; i++) {
          var fecha = new Date(desparasitaciones[i].fecha)
          if(fecha.getTime() > this.hoy.getTime()){
            this.desparasitacionesProximas.push(desparasitaciones[i])
            this.contProximas++
          }
        }
      },
      err => {
        console.log(err);
      }
    )

    this.mascotaService.getCelos(this.mascotaActual.id_mascota).subscribe(
      celos => {
        const size = Object.keys(celos);
        for (let i = 0; i < size.length ; i++) {
          var fecha = new Date(celos[i].fecha_i)
          if(fecha.getTime() > this.hoy.getTime()){
            this.celosProximas.push(celos[i])
            this.contProximas++
          }
        }
      },
      err => {
        console.log(err);
      }
    )

    this.mascotaService.getConsultas(this.mascotaActual.id_mascota).subscribe(
      consultas => {
        const size = Object.keys(consultas);
        for (let i = 0; i < size.length ; i++) {
          var fecha = new Date(consultas[i].fecha)
          if(fecha.getTime() > this.hoy.getTime()){
            this.consultasProximas.push(consultas[i])
            this.contProximas++
          }
        }
      },
      err => {
        console.log(err);
      }
    )

    this.mascotaService.getVacunas(this.mascotaActual.id_mascota).subscribe(
      vacunas => {
        const size = Object.keys(vacunas);
        for (let i = 0; i < size.length ; i++) {
          var fecha = new Date(vacunas[i].fecha_i)
          if(fecha.getTime() > this.hoy.getTime()){
            this.vacunasProximas.push(vacunas[i])
            this.contProximas++
          }
        }
      },
      err => {
        console.log(err);
      }
    )
  }



}
