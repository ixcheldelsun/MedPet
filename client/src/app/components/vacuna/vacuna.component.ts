import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { VacunasService } from '../../services/vacunas.service';
import { MascotasService } from '../../services/mascotas.service';

import { Vacuna } from '../../models/vacuna';
import { Mascota } from 'src/app/models/mascota';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent implements OnInit {

  vacunasMascota: any;
  mascotaActual: Mascota;

  formAgregar: FormGroup;

  nombreV = new FormControl('', Validators.required);
  claseV = new FormControl('', Validators.required);
  dosisV = new FormControl('', Validators.required);
  descV = new FormControl('', Validators.required);
  fechaV = new FormControl('', Validators.required);

  constructor(private vacunasService: VacunasService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

    this.formAgregar = fb.group({
      nombreV: this.nombreV,
      claseV: this.claseV,
      dosisV: this.dosisV,
      descV: this.descV,
      fechaV: this.fechaV
    });

    this.mascotaActual = this.mascotaService.mascotaActual;

   }

  ngOnInit() {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if(!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }

    this.mascotaService.getVacunas(this.mascotaActual.id_mascota).subscribe( 
      vacunas => {
        this.vacunasMascota = vacunas;
      },
      err =>{
        console.log(err);
      }
    )
    
  }

  crear() {
    const nuevaVacuna: Vacuna = {
      nombre: this.formAgregar.value.nombreV.toString(),
      dosis: this.formAgregar.value.dosisV,
      clase: this.formAgregar.value.claseV.toString(),
      descripcion: this.formAgregar.value.descV.toString(),
      fecha_i: this.formAgregar.value.fechaV,
      id_mascota: this.mascotaActual.id_mascota
    };
    let hoy =  new Date(Date.now());
    let fechaVacuna = new Date(this.formAgregar.value.fechaV);

    this.vacunasService.saveVacuna(nuevaVacuna).subscribe(
      res => { 
        if ( fechaVacuna.getTime() > hoy.getTime()){
          Swal.fire({
            type: 'info',
            title: `Agregaste una vacuna para dentro de ${Math.ceil((fechaVacuna.valueOf() - hoy.valueOf())/86400000)} días`,
            text: 'Se añadirá también en la sección "Próximas" para que puedas revisar rápidamente solo las fechas por venir',
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
        }
        else{
          Swal.fire({
            type: 'success',
            title: `Vacuna agregada`,
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
        }
        this.ngOnInit();
      },
      err => console.error(err)
    ); 
  }

}
