import { Component, OnInit } from '@angular/core';
import{ Router} from '@angular/router';
import { RouterLink } from '@angular/router';
import * as _ from 'lodash';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['./tabla-categorias.component.css']
})
export class TablaCategoriasComponent implements OnInit {
  
  usuarioActual:any;

  constructor(private router: Router, private usuarioService: UsuariosService) { }


  filters = {}
  ngOnInit() {    
  }


}
