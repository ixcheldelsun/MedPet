import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DesparasitacionService } from '../../services/desparasitacion.service';
import { MascotasService } from '../../services/mascotas.service';

import { Desparasitacion } from '../../models/desparasitacion';
import { Mascota } from 'src/app/models/mascota';

@Component({
  selector: 'app-desparasitacion',
  templateUrl: './desparasitacion.component.html',
  styleUrls: ['./desparasitacion.component.css']
})
export class DesparasitacionComponent implements OnInit {

  mascotaActual: Mascota;
  desparasitacionMascota: any;

  formAgregar: FormGroup;

  fechaD = new FormControl('', Validators.required);
  veterinarioD = new FormControl('', Validators.required);
  centroD = new FormControl('', Validators.required);
  vencimientoD = new FormControl('', Validators.required);
  observacionesD = new FormControl('', Validators.required);

  constructor(private desparasitacionService: DesparasitacionService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {

    this.formAgregar = fb.group({
      fechaD: this.fechaD,
      veterinarioD: this.veterinarioD,
      centroD: this.centroD,
      vencimientoD: this.vencimientoD,
      observacionesD: this.observacionesD
    });

  }

  ngOnInit() {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if (!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }

    this.mascotaService.getDesparasitaciones(this.mascotaActual.id_mascota).subscribe(
      desparasitaciones => {
        this.desparasitacionMascota = desparasitaciones;
      },
      err => {
        console.log(err);
      }
    )
  }

  crear() {
    const nuevaDesparasitacion: Desparasitacion = {
      fecha: this.formAgregar.value.fechaD,
      veterinario: this.formAgregar.value.veterinarioD.toString(),
      centro: this.formAgregar.value.centroD.toString(),
      vencimiento: this.formAgregar.value.vencimientoD,
      observaciones: this.formAgregar.value.observacionesD.toString(),
      id_mascota: this.mascotaActual.id_mascota,
    };

    this.desparasitacionService.saveDesparasitacion(nuevaDesparasitacion).subscribe(
      res => {
        console.log(nuevaDesparasitacion);
        this.ngOnInit();
      },
      err => console.error(err)
    );

  }

}


