import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MustMatch } from '../../helpers/must-match.validator';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-reinicia-pass',
  templateUrl: './reinicia-pass.component.html',
  styleUrls: ['./reinicia-pass.component.css']
})
export class ReiniciaPassComponent implements OnInit {

  token: string;
  idUsuario:number;

  formReinicio: FormGroup;
  submitted = false;
  tokenValido: boolean;

  passR = new FormControl('', [Validators.required, Validators.minLength(5)]);
  confR = new FormControl('', Validators.required);

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

  get f() { return this.formReinicio.controls; } //recibe los controles del form


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
