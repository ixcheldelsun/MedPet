import { Component, OnInit } from '@angular/core';

import { MascotasService } from '../../services/mascotas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service'

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Mascota } from '../../models/mascota'
import { UserDetails } from 'src/app/models/usuario';

@Component({
  selector: 'app-ficha-registro',
  templateUrl: './ficha-registro.component.html',
  styleUrls: ['./ficha-registro.component.css']
})
export class FichaRegistroComponent implements OnInit {

  usuarioActual: number;

  details: UserDetails;

  formMascota: FormGroup;

  busuarioActual: number;


  nombreM = new FormControl('', Validators.required);
  apodoM = new FormControl('', Validators.required);
  especieM = new FormControl('', Validators.required);
  razaM = new FormControl('', Validators.required);
  sexoM = new FormControl('', Validators.required);
  fechaM = new FormControl('', Validators.required);
  fotoM = new FormControl('', Validators.required);


  constructor(private auth: AuthService, private usuarioService: UsuariosService, private mascotasService: MascotasService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

    this.formMascota = fb.group({
      nombreM: this.nombreM,
      apodoM: this.apodoM,
      especieM: this.especieM,
      razaM: this.razaM,
      sexoM: this.sexoM,
      fechaM: this.fechaM,
      fotoM: this.fotoM
    });
   }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
        this.usuarioActual = this.details.id_usuario
      },
      err => {
        console.log(err)
      }
    )

  }

  registrar():void {

    const nuevaMascota: Mascota = {
      nombre: this.formMascota.value.nombreM.toString(),
      apodo: this.formMascota.value.apodoM.toString(),
      especie: this.formMascota.value.especieM.toString(),
      raza: this.formMascota.value.razaM.toString(),
      sexo: this.formMascota.value.sexoM.toString(),
      fecha_nacimiento: this.formMascota.value.fechaM,
      foto: this.formMascota.value.fotoM.toString(),
      id_usuario: this.usuarioActual
  }

    this.mascotasService.saveMascota(nuevaMascota)
    .subscribe(
      res => {
        this.router.navigate(['/inicio']);
      },
      err => console.error(err)
    );   

  }

}
