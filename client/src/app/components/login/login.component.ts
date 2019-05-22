import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUsuario: FormGroup;

  correoI = new FormControl('', Validators.required);
  contraseñaI = new FormControl('', Validators.required);

  constructor(private usuariosService: UsuariosService, fb: FormBuilder) { 
    this.formUsuario = fb.group({
      correoI: this.correoI,
      contraseñaI: this.contraseñaI
    });

  }

  ngOnInit() {
  }

  autenticar(): void {
    this.correoI = this.formUsuario.value.correoI
    this.contraseñaI = this.formUsuario.value.contraseñaI

    console.log(this.correoI);
    console.log(this.contraseñaI);

    this.usuariosService.auth(this.correoI.toString(), this.contraseñaI.toString());
    
  }

}

