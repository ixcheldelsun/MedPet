import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ObservacionService } from '../../services/observacion.service';
import { MascotasService } from '../../services/mascotas.service';

import { Observacion } from '../../models/observacion';
import { Mascota } from 'src/app/models/mascota';

import Swal from 'sweetalert2';

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
  formEditar: FormGroup;

  seleccion: Observacion

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

  fechaE = new FormControl('', Validators.required);
  tituloE = new FormControl('', Validators.required);
  fotoE = new FormControl('');
  textoE = new FormControl('', Validators.required);


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

    this.formEditar = fb.group({
      fechaE: this.fechaE,
      tituloE: this.tituloE,
      fotoE: this.fotoE,
      textoE: this.textoE,
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
        Swal.fire({
          type: 'success',
          title: `Observación agregada`,
          backdrop:'rgba(57, 207, 60, 0.48)'
        })
        
        this.ngOnInit();
      },
      err => console.error(err)
    );
  }

  selecciona(observacion: Observacion){
    this.seleccion = observacion;
    this.formEditar.patchValue({
      fechaE: observacion.fecha,
      tituloE: observacion.titulo,
      fotoE: observacion.foto,
      textoE: observacion.texto,
    });
  }

  eliminar(observacion: Observacion){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      type: 'question',
      title: `¿Deseas eliminar esta observación?`,
      text: 'Al aceptar no podrás recuperarla',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.observacionService.deleteObservacion(observacion.observacion_id).subscribe(
          res => {
            swalWithBootstrapButtons.fire({
              title: 'Eliminada',
              text: 'Ficha de observación eliminada',
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


  editar(){

    const editado: Observacion = {
      observacion_id: this.seleccion.observacion_id,
      fecha: this.formEditar.value.fechaE,
      titulo: this.formEditar.value.tituloE.toString(),
      foto: this.formEditar.value.fotoE.toString(),
      texto: this.formEditar.value.textoE.toString(),
      id_mascota: this.mascotaActual.id_mascota,
    };

    this.observacionService.editObservacion(editado).subscribe(
      res => {
        Swal.fire({
          type: 'success',
          title: `Editaste la observación exitosamente`,
          text: 'Podrás ver la ficha con los datos actualizados al cerrar este mensaje',
          backdrop:'rgba(57, 207, 60, 0.48)'
        })
        this.ngOnInit()
      }
    );
}

}
