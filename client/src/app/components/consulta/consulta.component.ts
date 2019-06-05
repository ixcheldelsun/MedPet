import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ConsultaService } from '../../services/consulta.service';
import { MascotasService } from '../../services/mascotas.service';

import { Consulta } from '../../models/consulta';
import { Mascota } from 'src/app/models/mascota';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  mascotaActual: Mascota;
  consultaMascota: any;

  formAgregar: FormGroup;

  fechaC = new FormControl('', Validators.required);
  veterinarioC = new FormControl('', Validators.required);
  centroC = new FormControl('', Validators.required);
  recipeC = new FormControl('', Validators.required);
  diagnosticoC = new FormControl('', Validators.required);
  observacionesC = new FormControl('', Validators.required);

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

    this.consultaService.saveConsulta(nuevaConsulta).subscribe(
      res => {
        this.ngOnInit();
      },
      err => console.error(err)
    );

  }

}
