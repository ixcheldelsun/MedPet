import { Component, OnInit} from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioActual: any;

  formLogin: FormGroup;

  formRegistro: FormGroup;

  correoI = new FormControl('', Validators.required);
  contraseñaI = new FormControl('', Validators.required);

  nombreR = new FormControl('', Validators.required);
  apellidoR = new FormControl('', Validators.required);
  correoR = new FormControl('', Validators.required);
  contraseñaR = new FormControl('', Validators.required);

  constructor(private usuariosService: UsuariosService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.formLogin = fb.group({
      correoI: this.correoI,
      contraseñaI: this.contraseñaI
    });

    this.formRegistro = fb.group({
      nombreR: this.nombreR,
      apellidoR: this.apellidoR,
      correoR: this.correoR,
      contraseñaR: this.contraseñaR
    });

  }

  ngOnInit() {
    this.usuariosService.currentMessage.subscribe(message => this.usuarioActual = message);
  }

  autenticar(): void {
    this.correoI = this.formLogin.value.correoI
    this.contraseñaI = this.formLogin.value.contraseñaI

    console.log(this.correoI);
    console.log(this.contraseñaI);

    this.usuariosService.auth(this.correoI.toString(), this.contraseñaI.toString())
    .subscribe(
      res => {
        this.usuarioActual = res[0].id_usuario;
        this.usuariosService.pasaMensaje(this.usuarioActual)
        console.log(this.usuarioActual);
        this.router.navigate(['/inicio']);
      },
      err => console.error(err)
    );   
  }

  registrar():void {
    this.nombreR = this.formRegistro.value.nombreR
    this.apellidoR = this.formRegistro.value.apellidoR
    this.correoR = this.formRegistro.value.correoR
    this.contraseñaR = this.formRegistro.value.contraseñaR

    this.usuariosService.saveUsuario(this.nombreR.toString(), this.apellidoR.toString(),this.correoR.toString(), this.contraseñaR.toString())
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
}

