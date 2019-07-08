//Imports

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CelosService } from '../../services/celos.service';
import { MascotasService } from '../../services/mascotas.service';

import { Celo } from '../../models/celo';
import { Mascota } from 'src/app/models/mascota';
import Swal from 'sweetalert2';

/**
 * Componente
 */
@Component({
  selector: 'app-celo',
  templateUrl: './celo.component.html',
  styleUrls: ['./celo.component.css']
})
/**
 * Clase celo
 */
export class CeloComponent implements OnInit {
/**
 * Declaracion de la variable mascotaActual
 */
  mascotaActual: Mascota;
/**
 * Declaracion de la variable celoMascota
 */
  celoMascota: any;
/**
 * Declaracion de la variable formAgregar
 */
  formAgregar: FormGroup;
/**
 * Declaracion de la variable fechaIC
 */
  fechaIC = new FormControl('', Validators.required);
/**
 * Declaracion de la variable fechaFC
 */
  fechaFC = new FormControl('', Validators.required);
/**
 * Declaracion de la variable observC
 */
  observC = new FormControl('', Validators.required);

/**
 * Constructor
 */
  constructor(private celoService: CelosService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {

    this.formAgregar = fb.group({
      fechaIC: this.fechaIC,
      fechaFC: this.fechaFC,
      observC: this.observC,
    });

  }

/**
 * ngOnInit
 */
  ngOnInit() {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if (!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }

    this.mascotaService.getCelos(this.mascotaActual.id_mascota).subscribe(
      celos => {
        this.celoMascota = celos;
      },
      err => {
        console.log(err);
      }
    )
  }
/**
 * Funcion crear nuevo celo
 */
  crear() {
    const nuevoCelo: Celo = {
      fecha_i: this.formAgregar.value.fechaIC,
      fecha_f: this.formAgregar.value.fechaFC,
      observaciones: this.formAgregar.value.observC.toString(),
      id_mascota: this.mascotaActual.id_mascota,
    };

    let hoy =  new Date(Date.now());
    let fechaCelo = new Date(this.formAgregar.value.fechaIC);

    this.celoService.saveCelo(nuevoCelo).subscribe(
      res => {
        if ( fechaCelo.getTime() > hoy.getTime()){
          Swal.fire({
            type: 'info',
            title: `Agregaste una fecha de inicio de celo para dentro de ${Math.ceil((fechaCelo.valueOf() - hoy.valueOf())/86400000)} días`,
            text: 'Se añadirá también en la sección "Próximas" para que puedas revisar rápidamente solo las fechas por venir',
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
        }
        this.ngOnInit();
      },
      err => console.error(err)
    );

  }

}
