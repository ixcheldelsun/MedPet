import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { MascotasService } from './services/mascotas.service';
import { Mascota } from './models/mascota';
import { SwUpdate, SwPush } from '@angular/service-worker';

const VAPID_PUBLIC = "BNhZ_xBn761AcFJaGpVEirwMKLfSWQsr0jitiQbdBVMpV2zV7aNp0cQszu98R6JLIIdfnzbLWGvC8qQZHLNaj_w";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MedPet';

  mascotaActual: Mascota;

  constructor(public auth: AuthService, private mascotaService: MascotasService, private swUpdate: SwUpdate, private swPush: SwPush) {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version! Would you like to update?')) {
          window.location.reload();
        }
      })
    }

    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC,
      })
        .then(subscription => {
          console.log('Hola');
        }).catch(console.error)
    }

  }
}

