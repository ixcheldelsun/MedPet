import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MascotasService } from '../../services/mascotas.service';

import { Mascota } from 'src/app/models/mascota';

@Component({
  selector: 'app-detalles-mascota',
  templateUrl: './detalles-mascota.component.html',
  styleUrls: ['./detalles-mascota.component.css']
})
export class DetallesMascotaComponent implements OnInit {

  mascotaActual: Mascota;

  constructor(private mascotaService: MascotasService, private router: Router) { }

  ngOnInit() {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if(!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }
  }

}
