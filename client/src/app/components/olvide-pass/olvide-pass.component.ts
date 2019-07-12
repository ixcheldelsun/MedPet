/**
 * Imports
 */
import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
/**
 * Componente
 */
@Component({
  selector: 'app-olvide-pass',
  templateUrl: './olvide-pass.component.html',
  styleUrls: ['./olvide-pass.component.css']
})
/**
 * Clase
 */
export class OlvidePassComponent implements OnInit {
/**
 * Declaracion de formOlvido
 */
  formOlvido: FormGroup;
/**
 * Declaracion de correoO
 */
  correoO = new FormControl('', [Validators.required, Validators.email]);
/**
 * Constructor
 */
  constructor(private usuariosService: UsuariosService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

    this.formOlvido = fb.group({
      correoO: this.correoO,
    });


   }
/**
 * ngOnInit
 */
  ngOnInit() {
  }
/**
 * Funcion olvidePass
 */
  olvidePass(): void{
    const olvidado: Usuario = {
      correo: this.formOlvido.value.correoO.toString()
    }
    console.log(olvidado)

    this.usuariosService.olvidePass(olvidado)
      .subscribe(
        res => {
          this.usuariosService.buscaUsuarioCorreo(olvidado).subscribe(
            usr => {
              console.log(usr)
              /**
 * Constante form
 */
              const form: any = {
                id: usr.id_usuario,
                correo: usr.correo,
                nombre: usr.nombre,
                token: usr.reinicia_contraseña,
                reinicia: true
              }

              this.usuariosService.enviaMensaje(form).subscribe(
                () => {
                  Swal.fire('Recupera tu acceso', 'Ya te enviamos un mensaje con instrucciones a tu correo: ' + olvidado.correo, 'success');
                });
              console.log("Para correo de recuperar contra:" + form)
            },
            err => console.error(err)
          );

          this.router.navigate(['/inicio'])
        },
        err => Swal.fire('Recuperación fallida', 'Ingresaste un correo que no está asociado a ninguna cuenta.', 'error')

      );


  }


}
