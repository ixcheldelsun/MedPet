import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuariosService } from '../../services/usuarios.service';
import { MascotasService } from '../../services/mascotas.service';
import { AuthService } from '../../services/auth.service';

import { Usuario, TokenPayload, UserDetails } from '../../models/usuario';
import { Mascota } from 'src/app/models/mascota';


/**
 * Componente
 */
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
/**
 * Declaracion de usuarioActual
 */
  usuarioActual: Number;
/**
 * Declaracion de details
 */
  details: UserDetails;
/**
 * Declaracion de mascotaActual
 */
  mascotaActual: Mascota;



/**
 * Constructor
 */
  constructor(private usuarioService: UsuariosService, private mascotaService: MascotasService, private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }
/**
 * ngOnInit
 */
  ngOnInit() {

    this.auth.profile().subscribe(
      user => {
        this.details = user
        this.usuarioActual = this.details.id_usuario;
      },
      err => {
        console.log(err)
      }
    )

    this.mascotaActual = this.mascotaService.mascotaActual;

    if(!this.mascotaActual) {
      this.router.navigateByUrl('/escoger-mascota')
    }

  }

}
