/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service'

/**
 * Injectable
 */
@Injectable({

  providedIn: 'root'
})
/**
 * Clase
 */
export class AuthGuardService implements CanActivate{

/**
 * Constructor
 */
  constructor(private auth: AuthService, private router: Router) { }

/**
 * Funcion canActivate
 */
  canActivate(): boolean {
/**
 * Condicional
 */
    if(!this.auth.isLoggedIn()) {
/**
 * Sentencia
 */
      this.router.navigateByUrl('/')
/**
 * Retorna
 */
      return false
    }
    
/**
 * retorna verdadero
 */
    return true
    
  }
}
