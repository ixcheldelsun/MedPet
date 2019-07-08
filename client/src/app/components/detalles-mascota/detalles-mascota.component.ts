import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MascotasService } from '../../services/mascotas.service';

import { Mascota } from 'src/app/models/mascota';

/**
 * Componente
 */
@Component({
  selector: 'app-detalles-mascota',
  templateUrl: './detalles-mascota.component.html',
  styleUrls: ['./detalles-mascota.component.css']
})
export class DetallesMascotaComponent implements OnInit {
/**
 * Declaracion de mascotaActual
 */
  mascotaActual: Mascota;
/**
 * constructor
 */
  constructor(private mascotaService: MascotasService, private router: Router) { }
/**
 * ngOnInit
 */
  ngOnInit() {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if(!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }
  }

}
