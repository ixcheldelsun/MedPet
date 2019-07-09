import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CelosService } from '../../services/celos.service';
import { MascotasService } from '../../services/mascotas.service';

import { Celo } from '../../models/celo';
import { Mascota } from 'src/app/models/mascota';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-celo',
  templateUrl: './celo.component.html',
  styleUrls: ['./celo.component.css']
})
export class CeloComponent implements OnInit {

  mascotaActual: Mascota;
  celoMascota: any;

  formAgregar: FormGroup;
  formEditar: FormGroup;

  seleccion: Celo;

  fechaIC = new FormControl('', Validators.required);
  fechaFC = new FormControl('', Validators.required);
  observC = new FormControl('', Validators.required);

  fechaIE = new FormControl('', Validators.required);
  fechaFE = new FormControl('', Validators.required);
  observE = new FormControl('', Validators.required);


  constructor(private celoService: CelosService, private mascotaService: MascotasService, private fb: FormBuilder, private router: Router) {

    this.mascotaActual = this.mascotaService.mascotaActual;
    
    this.formAgregar = fb.group({
      fechaIC: this.fechaIC,
      fechaFC: this.fechaFC,
      observC: this.observC,
    });

    this.formEditar = fb.group({
      fechaIE: this.fechaIE,
      fechaFE: this.fechaFE,
      observE: this.observE,
    });

    this.seleccion = {
      fecha_i: new Date(Date.now()),
      fecha_f: new Date(Date.now()),
      observaciones: "ini"
    }

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
        else{
          Swal.fire({
            type: 'success',
            title: `Período de celo agregado`,
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
        }
        this.ngOnInit();
      },
      err => console.error(err)
    );

  }
  selecciona(celo: Celo){
    this.seleccion = celo;
    this.formEditar.patchValue({
      fechaIE: celo.fecha_i, 
      fechaFE: celo.fecha_f,
      observE: celo.observaciones
    });

  }

  editar(){
      const editado: Celo = {
        id_celo: this.seleccion.id_celo,
        fecha_i: this.formEditar.value.fechaIE,
        fecha_f: this.formEditar.value.fechaFE,
        observaciones: this.formEditar.value.observE.toString(),
        id_mascota: this.mascotaActual.id_mascota
      };

      this.celoService.editCelo(editado).subscribe(
        res => {
          Swal.fire({
            type: 'success',
            title: `Editaste la ficha de celo exitosamente`,
            text: 'Podrás ver la ficha con los datos actualizados al cerrar este mensaje',
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
          this.ngOnInit()
        }
      );
  }

  eliminar(celo: Celo){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      type: 'question',
      title: `¿Deseas eliminar esta ficha de celo?`,
      text: 'Al aceptar no podrás recuperarla',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.celoService.deleteCelo(celo.id_celo).subscribe(
          res => {
            swalWithBootstrapButtons.fire({
              title: 'Eliminada',
              text: 'Ficha de celo eliminada',
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
