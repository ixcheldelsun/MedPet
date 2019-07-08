import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import * as _ from 'lodash';

import { UsuariosService } from '../../services/usuarios.service';
/**
 * Componente
 */
@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['./tabla-categorias.component.css']
})
export class TablaCategoriasComponent implements OnInit {
/**
 * Declaracion de usuarioActual
 */
  usuarioActual: any;
/**
 * Declaracion de filterExact2
 */
  filterExact2: any;
/**
 * Declaracion de constructor
 */
  constructor(private router: Router, private usuarioService: UsuariosService) { }

/**
 * Declaracion de filters
 */
  filters = {}
/**
 * Declaracion de ngOnInit
 */
  ngOnInit() {
  }


}
