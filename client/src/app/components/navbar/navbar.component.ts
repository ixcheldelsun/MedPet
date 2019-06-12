import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { Mascota } from 'src/app/models/mascota';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioActual: any;
  mascotaActual: Mascota;
  contProximas: number


  constructor(private mascotaService: MascotasService, public auth: AuthService) { 
    
  }

  ngOnInit() { 
    this.mascotaActual = this.mascotaService.mascotaActual;
  }
  
  menuresponsive() {
    var x = document.getElementById("BarraNave");
    if (x.className === "BarraNav") {
      x.className += " responsive";
    } else {
      x.className = "BarraNav";
    }
  }
}

