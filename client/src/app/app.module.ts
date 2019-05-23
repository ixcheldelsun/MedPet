import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'
import { InicioComponent } from './components/inicio/inicio.component'
import { FichaRegistroComponent } from './components/ficha-registro/ficha-registro.component'
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TablaCategoriasComponent } from './components/tabla-categorias/tabla-categorias.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './components/banner/banner.component';

import { UsuariosService } from './services/usuarios.service'
import { MascotasService } from './services/mascotas.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    FichaRegistroComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TablaCategoriasComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule

  ],
  providers: [
    UsuariosService,
    MascotasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
