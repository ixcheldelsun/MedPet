import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario, TokenPayload } from '../../models/usuario';
import Swal from 'sweetalert2'
import { SwUpdate } from '@angular/service-worker';

/**
 * Componente
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Clase
 */
export class LoginComponent implements OnInit {
/**
 * Declaracion de la variable usuarioActual
 */
  usuarioActual: any;
/**
 * Declaracion de la variable formLogin
 */
  formLogin: FormGroup;
/**
 * Declaracion de la variable formRegistro
 */
  formRegistro: FormGroup;
/**
 * Declaracion de la variable credenciales
 */
  credenciales: TokenPayload;
/**
 * Declaracion de la variable correoI
 */
  correoI = new FormControl('', [Validators.required, Validators.email]);
  /**
 * Declaracion de la variable passI
 */
  passI = new FormControl('', Validators.required);
/**
 * Declaracion de la variable nombreR
 */
  nombreR = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable apellidoR
 */
  apellidoR = new FormControl('', Validators.required);
  /**
 * Declaracion de la variable correoR
 */
  correoR = new FormControl('', [Validators.required, Validators.email]);
  /**
 * Declaracion de la variable passR
 */ 
  passR = new FormControl('', [Validators.required, Validators.minLength(5)]);
/**
 * Constructor
 */
  constructor(private auth: AuthService, private usuariosService: UsuariosService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private swUpdate: SwUpdate) {
    this.formLogin = fb.group({
      correoI: this.correoI,
      passI: this.passI
    });

    this.formRegistro = fb.group({
      nombreR: this.nombreR,
      apellidoR: this.apellidoR,
      correoR: this.correoR,
      passR: this.passR
    });



  }
/**
 * ngOnInit
 */
  ngOnInit() {
    this.usuariosService.currentMessage.subscribe(message => this.usuarioActual = message);
  }

 
 /**
 * Funcion para el login
 */
 login(): void {
  this.credenciales = {
    correo: this.formLogin.value.correoI,
    contraseña: this.formLogin.value.passI
  };


    this.auth.login(this.credenciales).subscribe(
      () => {
        Swal.fire({
          type: 'success',
          title: 'Iniciaste sesión exitosamente',
          text: 'Para continuar, selecciona tu mascota',
          backdrop: 'rgba(57, 207, 60, 0.48)'
        })
        this.router.navigateByUrl('/escoger-mascota')
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Error al iniciar sesión',
          text: 'Ingresaste incorrectamente tu correo y/o contraseña',
          backdrop: 'rgba(207, 57, 57, 0.48)'
        })
      }
    )
  }
/**
 * Funcion para el registro
 */
  register(): void {

    this.credenciales = {
      nombre: this.formRegistro.value.nombreR.toString(),
      apellido: this.formRegistro.value.apellidoR.toString(),
      correo: this.formRegistro.value.correoR.toString(),
      contraseña: this.formRegistro.value.passR.toString()
    };

    this.auth.register(this.credenciales).subscribe(
      () => {
        this.router.navigateByUrl('/nueva-mascota')
      },
      err => {
        console.log(err)
      }
    )
  }

  
/**
 * Funcion para obtener el usuario
 */
  getUsuarioActual(){
    return this.usuarioActual;
  }

  /*  autenticar(): void {
 
    const revisaUsuario: Usuario = {
       correo: this.formLogin.value.correoI.toString(),
       contraseña: this.formLogin.value.passI.toString(),
     };
 
     // this.correoI = this.formLogin.value.correoI
     // this.passI = this.formLogin.value.passI
 
     console.log(this.correoI);
     console.log(this.passI);
 
     this.usuariosService.auth(revisaUsuario)
     .subscribe(
       res => {
         this.usuarioActual = res[0].id_usuario;
         this.usuariosService.pasaMensaje(this.usuarioActual);
         console.log(this.usuarioActual);
         this.router.navigate(['/inicio']);
       },
       err => console.error(err)
     );   
   } */

  /* registrar():void {

    const nuevoUsuario: Usuario = {
      nombre: this.formRegistro.value.nombreR.toString(),
      apellido: this.formRegistro.value.apellidoR.toString(),
      correo: this.formRegistro.value.correoR.toString(),
      contraseña: this.formRegistro.value.passR.toString()
    };

    this.usuariosService.saveUsuario(nuevoUsuario)
    .subscribe(
      res => {
        this.usuarioActual = res;
        this.usuariosService.pasaMensaje(this.usuarioActual.id_usuario);
        this.router.navigate(['/nueva-mascota']);
      },
      err => console.error(err)
    );   

  }
 */

}

