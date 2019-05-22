import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuarioActual: any;

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit() {
    this.usuarioService.currentMessage.subscribe(message => this.usuarioActual = message);
  }

}
