import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CelosService } from '../../services/celos.service';
import { MascotasService } from '../../services/mascotas.service';

import { Celo } from '../../models/celo';
import { Mascota } from 'src/app/models/mascota';

@Component({
  selector: 'app-celo',
  templateUrl: './celo.component.html',
  styleUrls: ['./celo.component.css']
})
export class CeloComponent implements OnInit {

  mascotaActual: Mascota;
  celoMascota: any;

  formAgregar: FormGroup;

  fechaIC = new FormControl('', Validators.required);
  fechaFC = new FormControl('', Validators.required);
  observC = new FormControl('', Validators.required);


  constructor(private celoService: CelosService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {

    this.formAgregar = fb.group({
      fechaIC: this.fechaIC,
      fechaFC: this.fechaFC,
      observC: this.observC,
    });

  }

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

  crear() {
    const nuevoCelo: Celo = {
      fecha_i: this.formAgregar.value.fechaIC,
      fecha_f: this.formAgregar.value.fechaFC,
      observaciones: this.formAgregar.value.observC.toString(),
      id_mascota: this.mascotaActual.id_mascota,
    };

    this.celoService.saveCelo(nuevoCelo).subscribe(
      res => {
        this.ngOnInit();
      },
      err => console.error(err)
    );

  }

}
