import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ConsultaService } from '../../services/consulta.service';
import { MascotasService } from '../../services/mascotas.service';

import { Consulta } from '../../models/consulta';
import { Mascota } from 'src/app/models/mascota';

import Swal from 'sweetalert2'

/**
 * Componente
 */
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
/**
 * Clase
 */
export class ConsultaComponent implements OnInit {
/**
 * Declaracion de la variable mascotaActual
 */
  mascotaActual: Mascota;
/**
 * Declaracion de la variable consultaMascota
 */
  consultaMascota: any;
/**
 * Declaracion de la variable formAgregar
 */
  formAgregar: FormGroup;
/**
 * Declaracion de la variable fechaC
 */
  fechaC = new FormControl('', Validators.required);
/**
 * Declaracion de la variable veterinarioC
 */
  veterinarioC = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable centroC
 */
  centroC = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable recipeC
 */
  recipeC = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable diagnosticoC
 */
  diagnosticoC = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable observacionesC
 */
  observacionesC = new FormControl('', Validators.required);

  /**
 * Constructor
 */
  constructor(private consultaService: ConsultaService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {
    this.formAgregar = fb.group({
      fechaC: this.fechaC,
      veterinarioC: this.veterinarioC,
      centroC: this.centroC,
      recipeC: this.recipeC,
      diagnosticoC: this.diagnosticoC,
      observacionesC: this.observacionesC,
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

    this.mascotaService.getConsultas(this.mascotaActual.id_mascota).subscribe(
      consultas => {
        this.consultaMascota = consultas;
      },
      err => {
        console.log(err);
      }
    )
  }

  /**
 * Funcion crear una nueva consulta
 */
  crear() {
    const nuevaConsulta: Consulta = {
      fecha: this.formAgregar.value.fechaC,
      veterinario: this.formAgregar.value.veterinarioC.toString(),
      centro: this.formAgregar.value.centroC.toString(),
      recipe: this.formAgregar.value.recipeC.toString(),
      diagnostico: this.formAgregar.value.diagnosticoC.toString(),
      observaciones: this.formAgregar.value.observacionesC.toString(),
      id_mascota: this.mascotaActual.id_mascota,
    };
    let hoy =  new Date(Date.now());
    let fechaConsulta = new Date(this.formAgregar.value.fechaC);
    this.consultaService.saveConsulta(nuevaConsulta).subscribe(
      res => {
        if ( fechaConsulta.getTime() > hoy.getTime()){
          Swal.fire({
            type: 'info',
            title: `Agregaste una consulta para dentro de ${Math.ceil((fechaConsulta.valueOf() - hoy.valueOf())/86400000)} días`,
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
