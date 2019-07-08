import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuariosService } from '../../services/usuarios.service';
import { MascotasService } from '../../services/mascotas.service';
import { AuthService } from 'src/app/services/auth.service';

import { Mascota } from '../../models/mascota';

import { UserDetails } from '../../models/usuario';


/**
 * Componente
 */
@Component({
  selector: 'app-escoger-mascota',
  templateUrl: './escoger-mascota.component.html',
  styleUrls: ['./escoger-mascota.component.css']
})
export class EscogerMascotaComponent implements OnInit {
/**
 * Declaracion de usuarioActual
 */
  usuarioActual: number;
/**
 * Declaracion de details
 */
  details: UserDetails;
/**
 * Declaracion de mascotasUsuario
 */
  mascotasUsuario: any;
/**
 * Constructor
 */
  constructor(private auth: AuthService, private usuarioService: UsuariosService, private mascotaService: MascotasService) { }
/**
 * ngOnInit
 */
  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
        this.usuarioActual = this.details.id_usuario;
        this.usuarioService.getMascotas(this.usuarioActual).subscribe ( 
          mascotas => {
            this.mascotasUsuario = mascotas;
          },
          err => {
            console.log(err);
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }
/**
 * Funcion mascotaActual
 */
  mascotaActual(mascota: Mascota) {
    this.mascotaService.setMascotaActual(mascota);
  }

}
