import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuariosService } from '../../services/usuario.service';
import { MascotasService } from '../../services/mascotas.service';
import { AuthService } from 'src/app/services/auth.service';

import { Mascota } from '../../models/mascota';

import { UserDetails } from '../../models/usuario';
import { SwUpdate, SwPush } from '@angular/service-worker';

const VAPID_PUBLIC = "BNhZ_xBn761AcFJaGpVEirwMKLfSWQsr0jitiQbdBVMpV2zV7aNp0cQszu98R6JLIIdfnzbLWGvC8qQZHLNaj_w";

@Component({
  selector: 'app-escoger-mascota',
  templateUrl: './escoger-mascota.component.html',
  styleUrls: ['./escoger-mascota.component.css']
})
export class EscogerMascotaComponent implements OnInit {

  usuarioActual: number;
  details: UserDetails;
  mascotasUsuario: any;

  constructor(private swPush: SwPush, private auth: AuthService, private usuarioService: UsuariosService, private mascotaService: MascotasService) { }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
        this.usuarioActual = this.details.id_usuario;
        this.usuarioService.getMascotas(this.usuarioActual).subscribe(
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

    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC,
      })
        .then(subscription => {
          console.log('Hola');
        }).catch(console.error)
    }
  }

  mascotaActual(mascota: Mascota) {
    this.mascotaService.setMascotaActual(mascota);
  }

}
