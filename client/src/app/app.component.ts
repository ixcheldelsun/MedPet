/**
 * Import
 */
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MascotasService } from './services/mascotas.service';
import { Mascota } from './models/mascota';
import { SwUpdate, SwPush } from '@angular/service-worker';

/**
 * Componente
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * Clase
 */
export class AppComponent {
/**
 * Declarcion de la variable title
 */
  title = 'MedPet';
/**
 * Declarcion de la variable mascotaActual
 */
  mascotaActual: Mascota;
  readonly VAPID_KEY = 'BL08R64x9116xLBFIJDICSHCROAuWA1GFMRId__9pXojPDJvc4Va4r6ZGsY7_2MWvvo7b7GNFVFU2oIukroM1D0';


  constructor(public auth: AuthService, private mascotaService: MascotasService, private swUpdate: SwUpdate, private swPush: SwPush) {
    this.mascotaActual = this.mascotaService.mascotaActual;

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version! Would you like to update?')) {
          window.location.reload();
        }
      })
    }


  }
}

