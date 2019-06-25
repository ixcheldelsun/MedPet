import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { MascotasService } from './services/mascotas.service';
import { Mascota } from './models/mascota';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MedPet';

  mascotaActual: Mascota;

  constructor(public auth: AuthService, private mascotaService: MascotasService) {
    this.mascotaActual = this.mascotaService.mascotaActual;
  }

}


