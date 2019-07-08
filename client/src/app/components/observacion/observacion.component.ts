import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ObservacionService } from '../../services/observacion.service';
import { MascotasService } from '../../services/mascotas.service';

import { Observacion } from '../../models/observacion';
import { Mascota } from 'src/app/models/mascota';
/**
 * Componente
 */
@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css']
})

/**
 * Clase
 */
export class ObservacionComponent implements OnInit {
/**
 * Declaracion de la variable mascotaActual
 */
  mascotaActual: Mascota;
/**
 * Declaracion de la variable observacionMascota
 */
  observacionMascota: any;
/**
 * Declaracion de la variable formAgregar
 */
  formAgregar: FormGroup;
/**
 * Declaracion de la variable fechaO
 */
  fechaO = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable tituloO
 */
  tituloO = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable fotoO
 */
  fotoO = new FormControl('');
  /**
 * Declaracion de la variable textoO
 */
  textoO = new FormControl('', Validators.required);
 /**
 * Constructor
 */
  constructor(private observacionService: ObservacionService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {
    this.formAgregar = fb.group({
      fechaO: this.fechaO,
      tituloO: this.tituloO,
      fotoO: this.fotoO,
      textoO: this.textoO,
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

    this.mascotaService.getObservaciones(this.mascotaActual.id_mascota).subscribe(
      observaciones => {
        this.observacionMascota = observaciones;
      },
      err => {
        console.log(err);
      }
    )
  }
/**
 * Funcion crear observacion
 */
  crear() {
    const nuevaObservacion: Observacion = {
      fecha: this.formAgregar.value.fechaO,
      titulo: this.formAgregar.value.tituloO.toString(),
      foto: this.formAgregar.value.fotoO.toString(),
      texto: this.formAgregar.value.textoO.toString(),
      id_mascota: this.mascotaActual.id_mascota,
    };

    this.observacionService.saveObservacion(nuevaObservacion).subscribe(
      res => {
        this.ngOnInit();
      },
      err => console.error(err)
    );
  }

}
