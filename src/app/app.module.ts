import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'
import { InicioComponent } from './components/inicio/inicio.component'
import { FichaRegistroComponent } from './components/ficha-registro/ficha-registro.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    FichaRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
