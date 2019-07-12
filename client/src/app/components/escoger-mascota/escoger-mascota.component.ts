import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PushNotificationService } from '../../services/push-notification.service';
import { UsuariosService } from '../../services/usuario.service';
import { MascotasService } from '../../services/mascotas.service';
import { AuthService } from 'src/app/services/auth.service';
import { Mascota } from '../../models/mascota';

import { UserDetails } from '../../models/usuario';
import { SwUpdate, SwPush } from '@angular/service-worker';

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
  readonly VAPID_KEY = 'BL08R64x9116xLBFIJDICSHCROAuWA1GFMRId__9pXojPDJvc4Va4r6ZGsY7_2MWvvo7b7GNFVFU2oIukroM1D0';


/**
 * Constructor
 */
  constructor(private swUpdate: SwUpdate, private swPush: SwPush, private pushService: PushNotificationService, private auth: AuthService, private usuarioService: UsuariosService, private mascotaService: MascotasService) { }


/**
 * ngOnInit
 */
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
        serverPublicKey: this.VAPID_KEY
      })
        .then(subscription => {
          this.pushService.postSubscription(subscription).subscribe();
        })
        .catch(console.error)
    }
  }
/**
 * Funcion mascotaActual
 */
  mascotaActual(mascota: Mascota) {
    this.mascotaService.setMascotaActual(mascota);
  }

}
