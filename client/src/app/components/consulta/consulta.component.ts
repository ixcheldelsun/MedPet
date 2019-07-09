import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ConsultaService } from '../../services/consulta.service';
import { MascotasService } from '../../services/mascotas.service';

import { Consulta } from '../../models/consulta';
import { Mascota } from 'src/app/models/mascota';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  mascotaActual: Mascota;
  consultaMascota: any;

  seleccion: Consulta;
  

  formAgregar: FormGroup;
  formEditar: FormGroup;

  fechaC = new FormControl('', Validators.required);
  veterinarioC = new FormControl('', Validators.required);
  centroC = new FormControl('', Validators.required);
  recipeC = new FormControl('', Validators.required);
  diagnosticoC = new FormControl('', Validators.required);
  observacionesC = new FormControl('', Validators.required);

  fechaE = new FormControl('', Validators.required);
  veterinarioE = new FormControl('', Validators.required);
  centroE = new FormControl('', Validators.required);
  recipeE = new FormControl('', Validators.required);
  diagnosticoE = new FormControl('', Validators.required);
  observacionesE = new FormControl('', Validators.required);

  constructor(private consultaService: ConsultaService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {
    this.formAgregar = fb.group({
      fechaC: this.fechaC,
      veterinarioC: this.veterinarioC,
      centroC: this.centroC,
      recipeC: this.recipeC,
      diagnosticoC: this.diagnosticoC,
      observacionesC: this.observacionesC,
    });

    this.formEditar = fb.group({
      fechaE: this.fechaC,
      veterinarioE: this.veterinarioC,
      centroE: this.centroC,
      recipeE: this.recipeC,
      diagnosticoE: this.diagnosticoC,
      observacionesE: this.observacionesC,
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
        else{
          Swal.fire({
            type: 'success',
            title: `Consulta agregada`,
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
        }
        this.ngOnInit();
      },
      err => console.error(err)
    );

  }

  selecciona(consulta: Consulta){
    this.seleccion = consulta;
    this.formEditar.patchValue({
      fechaE: consulta.fecha,
      veterinarioE: consulta.fecha,
      centroE: consulta.centro,
      recipeE: consulta.recipe,
      diagnosticoE: consulta.diagnostico,
      observacionesE: consulta.observaciones,
    });
  }

  editar(){

    const editado: Consulta = {
      consulta_id: this.seleccion.consulta_id,
      fecha: this.formEditar.value.fechaE,
      veterinario: this.formEditar.value.veterinarioE.toString(),
      centro: this.formEditar.value.centroE.toString(),
      recipe: this.formEditar.value.recipeE.toString(),
      diagnostico: this.formEditar.value.diagnosticoE.toString(),
      observaciones: this.formEditar.value.observacionesE.toString(),
      id_mascota: this.mascotaActual.id_mascota
    };

    this.consultaService.editConsulta(editado).subscribe(
      res => {
        Swal.fire({
          type: 'success',
          title: `Editaste la consulta exitosamente`,
          text: 'Podrás ver la ficha con los datos actualizados al cerrar este mensaje',
          backdrop:'rgba(57, 207, 60, 0.48)'
        })
        this.ngOnInit()
      }
    );
}

  eliminar(consulta: Consulta){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      type: 'question',
      title: `¿Deseas eliminar esta consulta?`,
      text: 'Al aceptar no podrás recuperarla',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.consultaService.deleteConsulta(consulta.consulta_id).subscribe(
          res => {
            swalWithBootstrapButtons.fire({
              title: 'Eliminada',
              text: 'Ficha de consulta eliminada',
              type: 'success',
              backdrop:'rgba(57, 207, 60, 0.48)'
            } )
            this.ngOnInit();
          });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No eliminaste la ficha',
          'error'
        )
      }
    })
  }

}
