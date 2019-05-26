import { Component, OnInit} from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioActual: any;

  formLogin: FormGroup;

  formRegistro: FormGroup;



  correoI = new FormControl('', [Validators.required, Validators.email]);
  passI = new FormControl('', Validators.required);

  nombreR = new FormControl('', Validators.required);
  apellidoR = new FormControl('', Validators.required);
  correoR = new FormControl('', [Validators.required, Validators.email]);
  passR = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(private usuariosService: UsuariosService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { 
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

  ngOnInit() {
    this.usuariosService.currentMessage.subscribe(message => this.usuarioActual = message);
  }

  autenticar(): void {

    const revisaUsuario: Usuario = {
      correo: this.formLogin.value.correoI.toString(),
      contraseña: this.formLogin.value.passI.toString(),
    };

    // this.correoI = this.formLogin.value.correoI
    // this.contraseñaI = this.formLogin.value.contraseñaI

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
  }

  registrar():void {

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

  getUsuarioActual(){
    return this.usuarioActual;
  }

  reiniciarForm() {
    this.formLogin.reset();
  }
}

