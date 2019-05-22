import { Component, OnInit } from '@angular/core';

import { MascotasService } from '../../services/mascotas.service';

import { UsuariosService } from '../../services/usuarios.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha-registro',
  templateUrl: './ficha-registro.component.html',
  styleUrls: ['./ficha-registro.component.css']
})
export class FichaRegistroComponent implements OnInit {

  usuarioActual: any;

  formMascota: FormGroup;

  busuarioActual: number;


  nombreM = new FormControl('', Validators.required);
  apodoM = new FormControl('', Validators.required);
  especieM = new FormControl('', Validators.required);
  razaM = new FormControl('', Validators.required);
  sexoM = new FormControl('', Validators.required);
  fechaM = new FormControl('', Validators.required);


  constructor(private usuarioService: UsuariosService, private mascotasService: MascotasService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

    this.formMascota = fb.group({
      nombreM: this.nombreM,
      apodoM: this.apodoM,
      especieM: this.especieM,
      razaM: this.razaM,
      sexoM: this.sexoM,
      fechaM: this.fechaM
    });
   }

  ngOnInit() {
    this.usuarioService.currentMessage.subscribe(message => this.usuarioActual = message);
    console.log(this.usuarioActual);
  }

  registrar():void {
    this.nombreM = this.formMascota.value.nombreM
    this.apodoM = this.formMascota.value.apodoM
    this.especieM = this.formMascota.value.especieM
    this.razaM = this.formMascota.value.razaM
    this.sexoM = this.formMascota.value.sexoM
    this.fechaM = this.formMascota.value.fechaM

  

    this.mascotasService.saveMascota(this.nombreM.toString(), this.apodoM.toString(),this.especieM.toString(), this.razaM.toString(), this.sexoM.toString(), this.fechaM.toString(), this.usuarioActual)
    .subscribe(
      res => {
        this.router.navigate(['/inicio']);
      },
      err => console.error(err)
    );   

  }

}
