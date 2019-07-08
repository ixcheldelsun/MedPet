import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MustMatch } from '../../helpers/must-match.validator';

import Swal from 'sweetalert2'
/**
 * Componente
 */
@Component({
  selector: 'app-reinicia-pass',
  templateUrl: './reinicia-pass.component.html',
  styleUrls: ['./reinicia-pass.component.css']
})
/**
 * Clase
 */
export class ReiniciaPassComponent implements OnInit {
/**
 * Declaracion de la variable token
 */
  token: string;
/**
 * Declaracion de la variable idUsuario
 */
  idUsuario:number;
/**
 * Declaracion de la variable formReinicio
 */
  formReinicio: FormGroup;
/**
 * Declaracion de la variable submitted
 */
  submitted = false;
/**
 * Declaracion de la variable tokenValido
 */
  tokenValido: boolean;
/**
 * Declaracion de la variable passR
 */
  passR = new FormControl('', [Validators.required, Validators.minLength(5)]);
  /**
 * Declaracion de la variable confR
 */
  confR = new FormControl('', Validators.required);
/**
 * Constructor
 */
  constructor(private usuariosService: UsuariosService, fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.formReinicio = fb.group({
      passR: this.passR,
      confR: this.confR
    },
    {
      validator: MustMatch('passR','confR')
    });

    this.tokenValido = false;

  }
/**
 * ngOnInit
 */
  ngOnInit() {
    this.tokenValido = false;
      this.activatedRoute.queryParams.subscribe(params => {
        this.token = params['token']; //obtiene el token del url
        console.log(this.token)
        
        const revisa: any ={
          token: this.token,
          tokenValido: this.tokenValido
        }
        this.usuariosService.reiniciaPass(revisa).subscribe( rev => {
          this.tokenValido = true;
          console.log(this.tokenValido)
        },
        err => {
          Swal.fire({
            title:'El link no es válido', 
            text:'Vuelve a hacer una solicitud para recuperar tu contraseña', 
            type:'question',
            backdrop:'rgba(207, 57, 57, 0.48)'
          });
          this.router.navigate(['/olvide'])
        });
   
    });
  }
/**
 * Funcion para obtener f
 */
  get f() { return this.formReinicio.controls; } //recibe los controles del form

/**
 * Funcion onSubmit
 */
  onSubmit() {
    this.submitted = true;

    // se detiene si el form no es válido
    if (this.formReinicio.invalid) {
        return;
    }
    else{
      this.activatedRoute.queryParams.subscribe(params => {
        this.idUsuario = params['id'];
        const reinicia: any = {
          tokenValido: this.tokenValido,
          id: this.idUsuario,
          nuevoPass: this.formReinicio.value.passR.toString()
        }
        this.usuariosService.reiniciaPass(reinicia).subscribe(res => {
          Swal.fire({
            type: 'success',
            title: 'Reiniciaste tu contraseña exitosamente',
            text: 'Ahora puedes iniciar sesión con tu nueva contraseña',
            backdrop:'rgba(57, 207, 60, 0.48)'
          })
          this.router.navigateByUrl('/login')
        })
      });
    }
  }
  

}
