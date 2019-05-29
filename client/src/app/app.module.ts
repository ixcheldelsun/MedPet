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
import { VacunaComponent } from './components/vacuna/vacuna.component';
import { EscogerMascotaComponent } from './components/escoger-mascota/escoger-mascota.component';
import { CeloComponent } from './components/celo/celo.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './components/banner/banner.component';

import { UsuariosService } from './services/usuarios.service'
import { MascotasService } from './services/mascotas.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DetallesMascotaComponent } from './components/detalles-mascota/detalles-mascota.component';


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
    BannerComponent,
    VacunaComponent,
    EscogerMascotaComponent,
    CeloComponent,
    DetallesMascotaComponent
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
    MascotasService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
