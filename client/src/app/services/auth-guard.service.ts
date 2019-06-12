import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if(!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/')
      return false
    }
    
    return true
    
  }
}
