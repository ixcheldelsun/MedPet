/**
 * Import
 */
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MascotasService } from './services/mascotas.service';
import { Mascota } from './models/mascota';

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
  
/**
 * Constructor
 */
  constructor(
    /**
 * Declaracion de la variable auth
 */
    public auth: AuthService, 
  /**
 * Declaracion de la variable mascotaService
 */
    private mascotaService: MascotasService
    ) { 
    /**
 * Constructor
 */
    this.mascotaActual = this.mascotaService.mascotaActual;
  }
}
