/**
 * Imports
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { Mascota } from 'src/app/models/mascota';
/**
 * Componente
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
 * Clase
 */
export class NavbarComponent implements OnInit {
/**
 * Declaracion de usuarioActual
 */
  usuarioActual: any;
  /**
 * Declaracion de mascotaActual
 */
  mascotaActual: Mascota;
  /**
 * Declaracion de contProximas
 */
  contProximas: number

/**
 * Constructor
 */
  constructor(
      /**
 * Declaracion de la variable mascotaService
 */
    private mascotaService: MascotasService, 
    /**
 * Declaracion de la variable auth
 */
    public auth: AuthService
    ) { 
    
  }
/**
 * ngOnInit
 */
  ngOnInit() { 
  
    this.mascotaActual = this.mascotaService.mascotaActual;
  }
 /**
 * Funcion menuresponsive
 */ 
  menuresponsive() {
    /**
 * Variable x
 */
    var x = document.getElementById("BarraNave");
    /**
 * Condicional
 */
    if (x.className === "BarraNav") {
      x.className += " responsive";
    } else {
      x.className = "BarraNav";
    }
  }
}

