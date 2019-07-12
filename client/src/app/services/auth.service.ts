/**
 * Imports
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario, UserDetails, TokenPayload, TokenResponse } from '../models/usuario';

/**
 * Injectable
 */
@Injectable({
  /**
 * Injectable
 */
  providedIn: 'root'
})
/**
 * Clase
 */
export class AuthService {
/**
 * URL
 */
  API_URL = 'http://localhost:3000/usuarios';
/**
 * Se declara la variable token de tipo string
 */
  private token: string
/**
 * Constructor
 */
  constructor(private http: HttpClient, private router: Router) {}

/**
 * Funcion saveToken
 */
  private saveToken(token: string): void {
    localStorage.setItem('userToken', token)
    this.token = token
  }

/**
 * Funcion getToken
 */
  private getToken(): string {
  /**
 * Condicional
 */
    if(!this.token) {
      this.token = localStorage.getItem('userToken')
    }
/**
 * Funcion retorna
 */
    return this.token
  }

/**
 * Funcion getUserDetails
 */
  public getUserDetails(): UserDetails {
  /**
 * Constante
 */
    const token = this.getToken()
    let payload
      /**
 * Condicional
 */
    if(token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } 
    /**
 * Condicional
 */
    else {
      return null
    }
  }

/**
 * Funcion isLoggedIn
 */
  public isLoggedIn(): boolean {
  /**
 * Constante
 */
    const user =  this.getUserDetails()
    if(user) {
      return user.exp > Date.now() / 1000
    } 
    else {
      return false
    }
  } 

/**
 * Funcion register
 */
  public register (user: TokenPayload): Observable<any> {
      /**
 * Constante
 */  
    const base = this.http.post(`usuarios/crear`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

/**
 * Funcion login
 */
  public login (user: TokenPayload): Observable<any> {
    const base = this.http.post(`usuarios/auth`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

/**
 * Funcion profile
 */
  public profile(): Observable<any> {
    return this.http.get(`usuarios/profile`, {
      headers: { Authorization: `${this.getToken()}` }
    })
  }

/**
 * Funcion logout
 */
  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('userToken')
    this.router.navigateByUrl('/login')
  }





}
