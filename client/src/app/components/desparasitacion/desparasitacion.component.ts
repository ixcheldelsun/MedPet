import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DesparasitacionService } from '../../services/desparasitacion.service';
import { MascotasService } from '../../services/mascotas.service';

import { Desparasitacion } from '../../models/desparasitacion';
import { Mascota } from 'src/app/models/mascota';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desparasitacion',
  templateUrl: './desparasitacion.component.html',
  styleUrls: ['./desparasitacion.component.css']
})
export class DesparasitacionComponent implements OnInit {

  mascotaActual: Mascota;
  desparasitacionMascota: any;

  formAgregar: FormGroup;
  formEditar: FormGroup;

  seleccion: Desparasitacion;

  fechaD = new FormControl('', Validators.required);
  veterinarioD = new FormControl('', Validators.required);
  centroD = new FormControl('', Validators.required);
  vencimientoD = new FormControl('', Validators.required);
  observacionesD = new FormControl('', Validators.required);

  fechaE = new FormControl('', Validators.required);
  veterinarioE = new FormControl('', Validators.required);
  centroE = new FormControl('', Validators.required);
  vencimientoE = new FormControl('', Validators.required);
  observacionesE = new FormControl('', Validators.required);

  constructor(private desparasitacionService: DesparasitacionService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {

    this.formAgregar = fb.group({
      fechaD: this.fechaD,
      veterinarioD: this.veterinarioD,
      centroD: this.centroD,
      vencimientoD: this.vencimientoD,
      observacionesD: this.observacionesD
    });

    this.formEditar = fb.group({
      fechaE: this.fechaD,
      veterinarioE: this.veterinarioD,
      centroE: this.centroD,
      vencimientoE: this.vencimientoD,
      observacionesE: this.observacionesD
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

    let hoy =  new Date(Date.now());
    let fechaDesp = new Date(this.formAgregar.value.fechaD);

    this.desparasitacionService.saveDesparasitacion(nuevaDesparasitacion).subscribe(
      res => {
        if ( fechaDesp.getTime() > hoy.getTime()){
          Swal.fire({
            type: 'info',
            title: `Agregaste una desparasitación para dentro de ${Math.ceil((fechaDesp.valueOf() - hoy.valueOf())/86400000)} días`,
            text: 'Se añadirá también en la sección "Próximas" para que puedas revisar rápidamente solo las fechas por venir',
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
        }
        else{
          Swal.fire({
            type: 'success',
            title: `Desparasitación agregada`,
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
        }
        this.ngOnInit();
      },
      err => console.error(err)
    );

  }


  selecciona(desp: Desparasitacion){
    this.seleccion = desp;
    this.formEditar.patchValue({
      fechaE: desp.fecha,
      veterinarioE: desp.veterinario,
      centroE: desp.centro,
      vencimientoE: desp.vencimiento,
      observacionesE: desp.observaciones
    });
  }

  editar(){

    const editado: Desparasitacion = {
      desparasitacion_id: this.seleccion.desparasitacion_id,
      fecha: this.formEditar.value.fechaE,
      veterinario: this.formEditar.value.veterinarioE.toString(),
      centro: this.formEditar.value.centroE.toString(),
      vencimiento: this.formEditar.value.vencimientoE,
      observaciones: this.formEditar.value.observacionesE.toString(),
      id_mascota: this.mascotaActual.id_mascota,
    };

    this.desparasitacionService.editDesparasitacion(editado).subscribe(
      res => {
        Swal.fire({
          type: 'success',
          title: `Editaste la desparasitación exitosamente`,
          text: 'Podrás ver la ficha con los datos actualizados al cerrar este mensaje',
          backdrop:'rgba(57, 207, 60, 0.48)'
        })
        this.ngOnInit()
      }
    );
  }

  eliminar(desparasitacion: Desparasitacion){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      type: 'question',
      title: `¿Deseas eliminar esta desparasitación?`,
      text: 'Al aceptar no podrás recuperarla',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.desparasitacionService.deleteDesparasitacion(desparasitacion.desparasitacion_id).subscribe(
          res => {
            swalWithBootstrapButtons.fire({
              title: 'Eliminada',
              text: 'Ficha de desparasitación eliminada',
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


