import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioActual: any;

  constructor(private usuarioService: UsuariosService) { 
    
  }

  ngOnInit() {
    this.usuarioService.currentMessage.subscribe(message => this.usuarioActual = message);
    
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

